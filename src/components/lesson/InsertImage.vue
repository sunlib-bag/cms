<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true">添加图片</el-button>
    <el-dialog :visible.sync="dialogTableVisible">
      <el-table
        ref="singleTable"
        :data="tableData"
        @current-change="handleCurrentChange"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          property="name"
          label="选择要插入的图片">
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button type="primary" @click="insertImage"> 插入图片 </el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: "huaban.png",
            url: 'http://ac-l31sq3cj.clouddn.com/4f6435760b8fe76cc61a.png'
          },
          {
            name: "%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-06-22%20%E4%B8%8B%E5%8D%885.16.59.png",
            url: 'http://ac-l31sq3cj.clouddn.com/4f6435760b8fe76cc61a.png'
          }
        ],
        dialogTableVisible: false,
        currentSelected:{}
      }

    },
    methods: {
      handleCurrentChange: function (data) {
        this.currentSelected =  data
      },
      insertImage: function(){
        this.$bus.emit('insertImage',this.currentSelected);
        this.dialogTableVisible = false;
      },
      getLessonAllImage: function(){

      }
    }

  }
</script>

