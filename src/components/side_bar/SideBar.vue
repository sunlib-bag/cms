<template>
  <div >
      <div class="el-submenu__title">
        <h1>阳光盒子后台</h1>
      </div>
      <el-menu
        style="border-right: none"
        :default-active= "actionPage"
        class="el-menu-vertical-demo"

        @select="handleOpen"
        @close="handleClose">
        <el-menu-item index="lessonList">
          <i class="el-icon-tickets"></i>
          <span slot="title">课程列表</span>
        </el-menu-item>
        <el-menu-item index="subjectList">
          <i class="el-icon-menu"></i>
          <span slot="title">科目设置</span>
        </el-menu-item>


        <el-menu-item index="labels" v-if="isManager">
          <i class="el-icon-setting"></i>
          <span slot="title">标签设置</span>
        </el-menu-item>

        <el-menu-item index="topic" v-if="isManager">
          <i class="el-icon-setting"></i>
          <span slot="title">专题管理</span>
        </el-menu-item>

        <el-menu-item index="classInUserList" v-if="isAdmin">
          <i class="el-icon-tickets"></i>
          <span slot="title">导入用户表格</span>
        </el-menu-item>
        <!--<el-menu-item index="updataTeacherEXL" v-if="isAdmin">-->
          <!--<i class="el-icon-tickets"></i>-->
          <!--<span slot="title">鲸打卡信息录入</span>-->
        <!--</el-menu-item>-->

        <el-menu-item index="weChatHistoryList" v-if="isAdmin">
          <i class="el-icon-tickets"></i>
          <span slot="title">微信聊天列表</span>
        </el-menu-item>

        <el-menu-item index="logout">
          <i class="el-icon-setting"></i>
          <span slot="title">退出</span>
        </el-menu-item>
      </el-menu>

  </div>
</template>
<script>
//  v-bind:style="{ 'min-height': minHeight+'px'}"
  export default {
    props:{
      actionPage : {
        default: 'lessonList'
      },
      isAdmin:{
        default: false
      },
      isManager:{
        default: false
      }
    },
    data(){
      return{
        minHeight: window.screen.height-65
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        if(key ==='logout') {
          this.$API.logout();
          this.$router.push('/login');
          return ;
        }
        this.$router.push('/'+key )
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  h4{
    margin: 0;
    padding: 21px 14px;


  }
</style>
