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
    props:{
      lessonMaterials:{
        default:[]
      }
    },
    data() {
      return {
        images: [

        ],
        dialogTableVisible: false,
        currentSelected:{}
      }

    },
    mounted(){


    },
    watch:{
      lessonMaterials:{
        handler: function(lessonMaterials){
          this.images = [];
          for(let i = 0; i<lessonMaterials.length;i++){
            if(lessonMaterials[i].type === 3){
              this.images.push(lessonMaterials[i])
            }
            if(lessonMaterials[i].type === 0){
              for(let j =0 ;j < lessonMaterials[i].files.length; j++){
                if(lessonMaterials[i].files[j].type===3){
                  this.images.push(lessonMaterials[i].files[j])
                }
              }
            }
          }
        },
        deep:true
      }


    },
    methods: {
      handleCurrentChange: function (data) {
        this.currentSelected =  data
      },
      insertImage: function(){
        this.$bus.emit('insertImage',this.currentSelected);
        this.dialogTableVisible = false;
      }
    }

  }
</script>

