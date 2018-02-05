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
      label="updatedAt"
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
        <!--<el-popover-->
          <!--ref="1"-->
          <!--placement="top"-->
          <!--width="160"-->
          <!--&gt;-->
          <!--<p>这是一段内容这是一段内容确定删除吗？</p>-->
          <!--<div style="text-align: right; margin: 0">-->
            <!--<el-button size="mini" type="text">取消</el-button>-->
            <!--<el-button type="primary" size="mini">确定</el-button>-->
          <!--</div>-->
        <!--</el-popover>-->

        <!--<el-button v-popover="1">删除</el-button>-->
        <!--<el-button type="text" size="small">编辑</el-button>-->
      </template>

    </el-table-column>
  </el-table>
</template>
<script>
  export default {

    data() {
      return {
        lessonList:[]
      }
    },
    mounted(){
      let self = this;
      this.$API.getLesson(function (lessons) {
        self.lessonList = lessons['results']
      })
    },
    methods:{
      filterTag(value, row) {
        return row.subject.title === value ;
      },
      handleStatus(row){
       return row.isPublished?"已发布":"草稿"
      }

    }
  }
</script>
