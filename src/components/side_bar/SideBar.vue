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
        <el-menu-item index="sourceList">
          <i class="el-icon-setting"></i>
          <span slot="title">来源设置</span>
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
