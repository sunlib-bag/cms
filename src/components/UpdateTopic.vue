<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManager"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <h1>
        添加专题
      </h1>
      <el-form ref="form" :model="topicInfo" label-width="80px"  size="mini">
        <el-form-item label="标题">
          <el-input v-model="topicInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="专题配图">
          <div class="l-upload-container l-upload">
            <picture-input  ref="topicPicture" accept="image/jpeg,image/png" size="10" buttonClass="btn" @change="changePicture" :prefill='topicInfo.picture.url' :customStrings="{drag: '+'}">
            </picture-input>

          </div>
        </el-form-item>
        <el-form-item label="专题描述">
          <el-input v-model="topicInfo.describe" type="textarea"></el-input>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="updateTopic">立即更新</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import PictureInput from 'vue-picture-input'

  export default {
    data() {
      return {
        actionPage: 'type',
        isAdmin: false,
        isManager: true,
        topicInfo:{picture:{}},
        imageUrl: ''

      }
    },
    components: {
      PictureInput,
      ElInput,
      "side_bar": SideBar

    },
    mounted() {
        this.getTopicInfo();
    },
    methods: {

      getTopicInfo: function(){
        this.$API.getTopicInfo(this.$route.params.id, (topicInfo)=>{
          this.topicInfo = topicInfo
        },()=>{})
      },
      changePicture(image){

          this.topicInfo.updateImage =  {filename: this.$refs.topicPicture.fileName, image: image}
      },
      updateTopic: function(){
        if(this.topicInfo.title && (this.topicInfo.updateImage || this.topicInfo.picture)){
          this.$API.updateTopic(this.topicInfo, ()=>{
            this.$router.push('/topic');
          },() => {
            this.$message({
              type: 'error',
              message: '更新专题失败！'
            })
          })
        }else {
          this.$message({
            type: 'error',
            message: '请将信息补充完整'
          })
        }
      }

    }
  }
</script>

<style scoped>


  .l-upload-container {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .l-upload-input{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .l-upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .l-upload-img-container{
    width: 178px;
    height: 178px;
    position: absolute;
    top:0;
    left: 0;
  }
  .l-upload-img{
    width: 178px;
    height: 178px;
  }
  .l-upload{
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-form{
    width: 500px;
  }
  .big-container {
    min-width: 1200px;
  }

  .big-side {
    width: 150px !important;
    border-right: solid 1px #e6e6e6
  }

  .big-main {
    padding-left: 40px;
    padding-right: 40px;
    position: relative;

  }

  .pagination {
    padding: 20px;
    text-align: center;
  }

  .o-title__button {
    float: right;
  }


</style>
