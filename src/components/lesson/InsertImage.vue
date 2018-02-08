<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true">添加图片</el-button>
    <el-dialog :visible.sync="dialogTableVisible">
      <el-table
        ref="singleTable"
        :data="images"
        @current-change="handleCurrentChange"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          property="attributes.name"
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
        images: [

        ],
        dialogTableVisible: false,
        currentSelected:{}
      }

    },
    mounted(){
      if(this.$route.params.id){
        this.getLessonAllImage()
      }

    },
    methods: {
      handleCurrentChange: function (data) {
        this.currentSelected =  data
      },
      insertImage: function(){

        this.$bus.emit('insertImage',this.currentSelected.attributes.file.attributes);
        this.dialogTableVisible = false;
      },
      getLessonAllImage: function(){
          var self = this;
          this.$API.getLessonImage(this.$route.params.id,function(images){

            self.images = images
          })
      }
    }

  }
</script>

