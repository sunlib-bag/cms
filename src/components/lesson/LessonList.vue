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
      :filters="[{ text: '儿歌', value: '儿歌' }, { text: '童话', value: '童话' }]"
      :filter-method="filterTag"
      filter-placement="bottom-start"
      prop="subject.title"
      label="科目"
    >
    </el-table-column>
    <el-table-column
      prop="updatedAt"
      label="来源"
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
      prop="isPublished"
      :formatter="handleStatus"
      label="状态"
    >
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button type="success" size="small">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteLesson(scope)">删除</el-button>

      </template>

    </el-table-column>
  </el-table>
</template>
<script>
  export default {

    data() {
      return {
        lessonList: []
      }
    },
    mounted() {
      let self = this;
      this.$API.getLesson(function (lessons) {
        self.lessonList = lessons['results']
      })
    },
    methods: {
      filterTag(value, row) {
        return row.subject.title === value;
      },
      handleStatus(row) {
        return row.isPublished ? "已发布" : "草稿"
      },
      handleDate(row) {

      },
      deleteLesson(scope) {
        let self = this;
        this.$confirm('此操作将永久删除' + scope.row.name + ', 是否继续?', '提示', {
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
      }

    }
  }
</script>
