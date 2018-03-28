<template>
  <div>
    <el-table
      :data="lessonList"
      style="width: 100%; text-align: left">
      <el-table-column
        prop="name"
        label="课程名称"
        width="100">
      </el-table-column>
      <el-table-column
        :filters="subjectFilter"
        :filter-method="filterTag"
        filter-placement="bottom-start"
        prop="subject.title"
        label="科目"
      >
      </el-table-column>
      <el-table-column
        prop="tages"
        label="来源"

        :formatter="handleSource"
        filter-placement="bottom-start"
        :filters="sourceList"
        :filter-method="filterSource"
      >
      </el-table-column>
      <el-table-column
        prop="updatedAt"

        :formatter="handleDate"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="draft_version_code"
        label="最新草稿版本"

      >

      </el-table-column>

      <el-table-column
        prop="version_code"
        label="发布版本">
        <template slot-scope="scope">
          <span>{{scope.row.isPublished ? scope.row.version_code : '未发布'}}</span>
          <el-button type="text" v-if='scope.row.isPublished' @click="downPackage(scope.row.package.url)">下载</el-button>


        </template>


      </el-table-column>

      <el-table-column
        prop="package"
        label="状态">

        <template slot-scope="scope">

          <span class="state">{{formatStatue(scope.row)}}</span>
          <el-button type="success" size="small" @click="showNeedExamine(scope.row.objectId)">查看</el-button>
        </template>

      </el-table-column>

      <el-table-column
        width="250px"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="goToUpdateLesson(scope)">编辑</el-button>
          <el-button v-if="isManagingEditor" type="danger" size="small"  @click="deleteLesson(scope, lessonList)">删除</el-button>
          <el-button v-if="isManagingEditor"  type="danger" size="small" :disabled="!scope.row.isPublished"
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
        <el-table-column property="isChecked" label="状态" :formatter="formatStatue">

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
  .pagination {
    padding: 20px;
    text-align: center;
  }
  .state{
    width: 50px;
    display: inline-block;
  }


</style>
<script>

  import {formatTime, formatState} from '../filters/filters.js';
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
      formatDate(row) {
        var date = new Date(row.createdAt);
        return formatTime(date, "yyyy-MM-dd");
      },
      formatStatue(row){
        return formatState(row.isChecked);
      },
      showNeedExamine(id){
        var self = this;
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
          self.lessonList = lessons.result;
          self.total = lessons.count;
          console.log(lessons.count)
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
        if (!tags) return ''

        for (let i = 0; i < tags.length; i++) {
          let tagInfo = tags[i].split('.'); //todo
          if (tagInfo[0] === 'source') {
            tagInfo.shift()
            let source = tagInfo.join('.')
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
