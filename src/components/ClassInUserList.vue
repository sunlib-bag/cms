<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManager"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <div class="o-upload">
        <el-button  class="o-upload_button"  type="success" @click="addUserInfoFile($event)" >上传用户表格</el-button>
        <input v-on:change="uploadUserInfoFile"   type='file' accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="hide"/>
      </div>
    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'

  export default {
    data() {
      return {
        actionPage:'classInUserList',
        isAdmin: false,
        isManager: false
      }
    },
    components: {
      "side_bar": SideBar
    },

    mounted() {
      let self = this;
      this.$API.checkUserRole((roles) =>{
        this.isAdmin =  (roles.indexOf('admin')>=0);
        this.isManager = (roles.indexOf('manager')>=0)
        console.log(this.isManager)
        if(!this.isAdmin){
          self.$router.push('/')
        }
      });
      $('.big-container').css('min-height', window.screen.height + 'px')

    },
    methods: {
      addUserInfoFile:function(e){
        $(e.currentTarget).parent().find('input').click()
      },
      uploadUserInfoFile: function(e){

        let fileUploadControl = $(e.currentTarget)[0];
        let self = this;

        if (fileUploadControl.files.length > 0) {
          let localFile = fileUploadControl.files[0];
          self.openLoading('正在上传');
          this.$API.uploadUserInfoFile(localFile.name, localFile, function (result) {
            $(fileUploadControl).val('');
            self.closeLoading();
            self.$message({
              type: 'success',
              message: 'excel表格上传成功!'
            });

          }, function () {
            $(fileUploadControl).val('');
            self.closeLoading();
            self.$message({
              type: 'error',
              message: 'excel表格上传失败!'
            });

          })
        }
      },
      openLoading(message) {
        this.loading = this.$loading({
          lock: true,
          text: message,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      closeLoading() {
        this.loading.close();
      }
    }
  }
</script>


<style scoped>

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

  }
  .hide{
    display: none;
  }
  .o-upload{
    margin: 50px auto;
    text-align: center;
  }
  .o-upload_button{
    width: 50%;
  }


  /*.min-header-container {*/
    /*height: 40px;*/
    /*padding: 0*/
  /*}*/

  /*.min-header-container .el-main {*/
    /*padding: 0 21px*/
  /*}*/

  /*.min-header-container .el-main h1 {*/
    /*margin: 0;*/
  /*}*/

  .min-header-container .el-aside {
    height: 80px;
    width: 150px;
    text-align: right;
  }

  .lesson-list {
  }

</style>
