<template>

  <el-table
    :data="lessonList"
    style="width: 100%; text-align: left">
    <el-table-column
      prop="attributes.name"
      label="课程名称"
      width="100">
    </el-table-column>
    <el-table-column
      :filters="subjectFilter"
      :filter-method="filterTag"
      filter-placement="bottom-start"
      prop="attributes.subject.attributes.title"
      label="科目"
    >
    </el-table-column>
    <el-table-column
      prop="attributes.tages"
      label="来源"
      :formatter="handleSource"
      filter-placement="bottom-start"
      :filters="[{ text: 'test', value: 'test' }, { text: 'ui', value: 'ui' }]"
      :filter-method="filterTag"
    >
    </el-table-column>
    <el-table-column
      prop="updatedAt"
      :formatter="handleDate"
      label="创建时间"
    >
    </el-table-column>
    <el-table-column
      prop="attributes.draft_version_code"
      label="最新草稿版本"
    >

    </el-table-column>

    <el-table-column
      prop="attributes.version_code"
      :formatter="handleStatus"
      label="发布版本"
    >

    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button type="success" size="small" @click="goToUpdateLesson(scope)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteLesson(scope)">删除</el-button>

      </template>

    </el-table-column>
  </el-table>
</template>
<script>
  export default {

    data() {
      return {
        lessonList: [],
        subjectFilter:[]
      }
    },
    mounted() {
      let self = this;
      this.$API.getLesson(function (lessons) {

        self.lessonList = lessons
      });

      this.$API.getSubjectList(function(subjectList){

        for(let i =0; i< subjectList.length;i++){
          let subject ={text: subjectList[i].attributes.title, value: subjectList[i].attributes.objectId};
          self.subjectFilter.push(subject)
        }
      },function(){

      })
    },
    methods: {
      filterTag(value, row) {
        return row.attributes.subject.attributes.objectId === value;
      },
      handleStatus(row) {
        return row.attributes.isPublished ?  row.attributes.version_code : "未发布"
      },
      handleDate(row) {

      },
      handleSource(row){
        let tags = row.attributes.tags
        for(let i = 0;i<tags.length;i++){
          let tagInfo = tags[i].split('.'); //todo
          if(tagInfo[0] === 'source'){
            return tagInfo[1]
          }
        }
      },
      deleteLesson(scope) {
        let self = this;
        this.$confirm('此操作将永久删除' + scope.row.attributes.name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          self.$API.deleteLesson(scope.row.objectId,function(){
//            self.$message({
//              type: 'success',
//              messa ge: '删除成功!'
//            });
//          });

        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goToUpdateLesson(scope){

        this.$router.push('/lessonInfo/'+scope.row.id)
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


    }
  }
</script>
