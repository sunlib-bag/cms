<template>
  <div>
    <el-table
      ref = "lessonListTable"
      :data="lessonList"
      class="table">
      <el-table-column
        prop="name"
        :width="tableWidth*0.16"
        label="课程名称">
      </el-table-column>
      <el-table-column
        :filters="subjectFilter"
        :filter-method="filterTag"
        filter-placement="bottom-start"
        prop="subject.title"
        label="科目"
        :width="tableWidth*0.08"
      >
      </el-table-column>
      <el-table-column
        prop="tages"
        label="来源"
        :width="tableWidth*0.1"
        :formatter="handleSource"
        filter-placement="bottom-start"
        :filters="sourceList"
        :filter-method="filterSource"
      >
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        :width="tableWidth*0.1"
        :formatter="handleDate"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        :width="tableWidth*0.1"
        prop="draft_version_code"
        label="最新草稿版本"

      >

      </el-table-column>

      <el-table-column
        prop="version_code"
        label="发布版本"
        :width="tableWidth*0.1">
        <template slot-scope="scope">
          <span>{{scope.row.isPublished ? scope.row.version_code : '未发布'}}</span>
          <el-button type="text"   v-if='scope.row.isPublished' @click="downPackage(scope.row.package.url)">下载</el-button>


        </template>


      </el-table-column>

      <el-table-column
        prop="package"
        label="状态"
        :width="tableWidth*0.16">

        <template slot-scope="scope">

          <span class="state" v-bind:style="{color: handleColor(scope.row.isChecked)}">{{formatStatue(scope.row.isChecked)}}</span>
          <el-button type="text"  @click="showNeedExamine(scope.row.objectId)">查看</el-button>
        </template>

      </el-table-column>

      <el-table-column
        label="操作"
        :width="tableWidth*0.2"
      >
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="goToUpdateLesson(scope)">编辑</el-button>
          <el-button v-if="isManagingEditor" type="text"  class="warn"  @click="deleteLesson(scope, lessonList)">删除</el-button>
          <el-button v-if="isManagingEditor"  type="text"  class="warn"  :disabled="!scope.row.isPublished"
                     @click="callbackLesson(scope, lessonList)">下架
          </el-button>

        </template>

      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        @current-change="changePage">
      </el-pagination>
    </div>


    <el-dialog title="审核详细" :visible.sync="dialogNeedExamineListVisible">
      <el-table :data="needExamineList" >
        <el-table-column property="complier" label="编辑人" ></el-table-column>
        <el-table-column property="draft_version_code" label="版本" ></el-table-column>
        <el-table-column property="createdAt" label="日期" :formatter="formatDate"></el-table-column>
        <el-table-column property="isChecked" label="状态" >
          <template slot-scope="scope">
            <span class="black" v-if="scope.row.isChecked===0">{{formatStatue(scope.row.isChecked)}}</span>
            <span class="orange" v-if="scope.row.isChecked===1">{{formatStatue(scope.row.isChecked)}}</span>
            <span class="warn" v-if="scope.row.isChecked===2">{{formatStatue(scope.row.isChecked)}}</span>
            <span class="black" v-if="scope.row.isChecked===3">{{formatStatue(scope.row.isChecked)}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="isManagingEditor" label="操作" >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="goToExamine(scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>



  </div>


</template>
<style scoped="">
  .table{
    width: 100%;
    text-align: left;
  }
  .pagination {
    padding: 20px;
    text-align: center;
  }
  .state{
    width: 50px;
    display: inline-block;
  }
  .warn{
    color: #F56C6C;
  }
  .black{
    color: #606266;
  }
  .orange{
    color: #E6A23C;
  }



</style>
<script>

  import {formatTime, formatState, formatColor} from '../filters/filters.js';
  export default {
    props: {
      isManagingEditor: {
        default: false
      }
    },

    data() {
      return {
        lessonList: [],
        subjectFilter: [],
        needExamineList:[],
        total: 1,
        limit: 20,
        dialogNeedExamineListVisible: false,
        stateColor: '',
        tableWidth: $(".lesson-list").width(),
        sourceList: [
          {"value": "千千树", text: "千千树"},
          {"value": "儿童乐益会", text: "儿童乐益会"},
          {"value": "安利基金会", text: "安利基金会"},
          {"value": "广西师大出版社", text: "广西师大出版社"},
          {"value": "救助儿童会", text: "救助儿童会"},
          {"value": "信谊基金会", text: "信谊基金会"},
          {"value": "一公斤盒子", text: "一公斤盒子"},
          {"value": "澳门同济慈善会", text: "澳门同济慈善会"},
          {"value": "奕阳教育", text: "奕阳教育"},
          {"value": "通州儿童之家", text: "通州儿童之家"},
          {"value": "西部阳光基金会", text: "西部阳光基金会"},
          {"value": "农村小规模学校联盟", text: "农村小规模学校联盟"},
          {"value": "凉善公益", text: "凉善公益"},
        ]
      }
    },
    mounted() {
      let self = this;
      self.tableWidth  = $(".lesson-list").width()
      $(window).resize(function(){
        self.tableWidth  = $(".lesson-list").width()
      });
      this.getLesson(1);
      this.$API.getSubjectList(function (subjectList) {

        for (let i = 0; i < subjectList.length; i++) {
          let subject = {text: subjectList[i].title, value: subjectList[i].objectId};
          self.subjectFilter.push(subject)
        }
      }, function () {
        self.$message({
          type: 'error',
          message: '获取科目列表失败!'
        });
      })
    },

    methods: {
      handleColor(isChecked){


        return formatColor(isChecked);
      },
      formatDate(row) {
        return formatTime(row.createdAt, "yyyy-MM-dd");
      },
      formatStatue(isChecked){
        return formatState(isChecked);
      },
      clearFilter(){
        this.$refs.lessonListTable.clearFilter();
      },
      showNeedExamine(id){
        let self = this;
        this.$API.getNeedExamineList(id, function(lessonSnapshotList){

          self.needExamineList = lessonSnapshotList;
          self.dialogNeedExamineListVisible = true;
        },function(){

        })
      },
      goToExamine(scope){
        this.$router.push('/examineLessonInfo/' + scope.row.objectId)
      },
      changePage(currentPage) {
        console.log(currentPage);
        this.getLesson(currentPage);
      },
      getLesson(page) {
        let self = this;
        this.$API.getLesson(this.limit, page, function (lessons) {
          self.clearFilter();
          self.lessonList = lessons.result;
          self.total = lessons.count;
        }, function () {
          self.$message({
            type: 'error',
            message: '获取课程列表失败!'
          });
        });
      },
      filterSource(value, row) {
        let tags = row.tags;
        let source;
        if (!tags) return false;

        for (let i = 0; i < tags.length; i++) {
          let tagInfo = tags[i].split('.'); //todo
          if (tagInfo[0] === 'source') {
            tagInfo.shift();
            source = tagInfo.join('.')
          }
        }
        return value === source
      },
      filterTag(value, row) {
        return row.subject.objectId === value;
      },
      handleStatus(row) {
        return row.isPublished ? row.version_code : "未发布"
      },
      handleDate(row) {

      },
      handleSource(row) {
        let tags = row.tags;
        if (!tags) return '';

        for (let i = 0; i < tags.length; i++) {
          let tagInfo = tags[i].split('.'); //todo
          if (tagInfo[0] === 'source') {
            tagInfo.shift();
            let source = tagInfo.join('.');
            return source
          }
        }
        return ''


      },
      deleteLesson(scope, lessonList) {
        let self = this;
        this.$confirm('此操作将永久删除' + scope.row.name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$API.deleteLesson(scope.row.objectId, function () {
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
            lessonList.splice(scope.$index, 1)
          }, function (code) {
            let message = (code == 403) ? '权限异常，删除课程失败!' : '删除课程失败!'
            self.$message({
              type: 'error',
              message: message
            });
          });

        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goToUpdateLesson(scope) {

        this.$router.push('/lessonInfo/' + scope.row.objectId)
      },
      handleDate(time_info) {
        var fmt = 'yyyy/MM/dd';
        var time = new Date(time_info.createdAt);
        var o = {
          "M+": time.getMonth() + 1, //月份
          "d+": time.getDate(), //日
          "h+": time.getHours(), //小时
          "m+": time.getMinutes(), //分
          "s+": time.getSeconds(), //秒
          "q+": Math.floor((time.getMonth() + 3) / 3), //季度
          "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
      },
      downPackage(url) {
        window.open(url)
      },
      callbackLesson(scope, lessonList) {
        let self = this;
        this.$confirm('此操作下架' + scope.row.name + '课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$API.callbackLesson(scope.row.objectId, function () {
            self.$message({
              type: 'success',
              message: '下架成功!'
            });
            lessonList[scope.$index].isPublished = false;
          }, function (code) {
            let message = (code == 403) ? '权限异常，下架课程失败!' : '下架课程失败!';
            self.$message({
              type: 'error',
              message: message
            });
          });

        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消下架'
          });
        });
      },
      showNeedExamineList() {

      }


    }
  }
</script>
