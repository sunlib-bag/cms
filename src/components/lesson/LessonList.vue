<template>

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
      :formatter="handleStatus"
      label="发布版本">



    </el-table-column>

    <el-table-column
      prop="package"
      label="课程包">

      <template slot-scope="scope">

        <el-button type="text" v-if='scope.row.package' @click="downPackage(scope.row.package.url)">下载</el-button>
        <span v-if="!scope.row.package">N/A</span>

      </template>

    </el-table-column>

    <el-table-column
      width="200px"
      label="操作"
    >
      <template slot-scope="scope">
        <el-button type="success" size="small" @click="goToUpdateLesson(scope)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteLesson(scope, lessonList)">删除</el-button>

      </template>

    </el-table-column>
  </el-table>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {

    components: {ElButton},
    data() {
      return {
        lessonList: [],
        subjectFilter: [],
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
      this.$API.getLesson(function (lessons) {
        self.lessonList = lessons
      }, function () {
        self.$message({
          type: 'error',
          message: '获取课程列表失败!'
        });
      });

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
      filterSource(value, row){

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
          self.$API.deleteLesson(scope.row.objectId,function(){
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
            lessonList.splice(scope.$index, 1)
          },function(){
            self.$message({
              type: 'error',
              message: '删除课程失败!'
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
      downPackage(url){
        window.open(url)
      }


    }
  }
</script>
