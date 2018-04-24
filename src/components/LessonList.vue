<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManagingEditor"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <el-row align="middle">
        <el-col :span="18"><h3>课程列表</h3></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button @click="initLesson">添加课程</el-button>
        </el-col>
      </el-row>
      <div class="lesson-list">
        <course_list :isManagingEditor="isManagingEditor">
        </course_list>
      </div>
    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import LessonList from './lesson/LessonList.vue'


  export default {
    data() {
      return {
        lessonList: [],
        subjectFilter: [],
        actionPage: 'lessonList',
        isManagingEditor: false,
        isAdmin: false,
      }
    },
    components: {
      "side_bar": SideBar,
      'course_list': LessonList
    },

    mounted() {
      let self = this;
      this.$API.checkUserRole((roles) =>{
        this.isManagingEditor =  (roles.indexOf('manager')>=0);
        this.isAdmin =  (roles.indexOf('admin')>=0);
        if(roles.length === 0){
          self.$router.push('/')
        }
      });
      $('.big-container').css('min-height', window.screen.height + 'px')

    },
    methods: {
      initLesson() {
        let self = this;
        this.$API.initLesson(function (lesson) {
          self.$router.push('/lessonInfo/' + lesson.objectId)
        }, function () {
          self.$message({
            type: 'error',
            message: '创建课程失败！'
          });
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .min-header-container {
    height: 40px;
    padding: 0
  }

  .min-header-container .el-main {
    padding: 0 21px
  }

  .min-header-container .el-main h1 {
    margin: 0;
  }

  .min-header-container .el-aside {
    height: 80px;
    width: 150px;
    text-align: right;
  }

  .lesson-list {
  }

</style>
