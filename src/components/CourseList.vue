<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar></side_bar>
    </el-aside>
    <el-main class="big-main">
      <el-row align="middle">
        <el-col :span="18"><h3>课程列表</h3></el-col>
        <el-col :span="6" style="text-align: right"><el-button>添加课程</el-button></el-col>
      </el-row>
      <div class="lesson-list">
        <course_list>
        </course_list>
      </div>
    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import LessonList from './course/LessonList.vue'
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    data() {
      return {
        lessonList: []
      }
    },
    components: {
      ElButton,
      ElContainer,
      "side_bar": SideBar,
      'course_list': LessonList
    },

    mounted() {

      $('.big-container').css('min-height',window.screen.height+'px')
//      console.log(this.test)
//      this.$API.login(JSON.stringify({"username": "liguangsong", "password": "nanrenbuku"}))
//      var data = {"username": "liguangsong", "password": "nanrenbuku"}
//      var info = JSON.stringify(data)
//      $.ajax({
//        url:'https://cqbvih8f.api.lncld.net/1.1/login',
//        headers:this.getHeaders(),
//        data:info,
//        method:'POST',
//        success:function(data){
//          console.log(data)
//        },error:function(){
//
//        }
//      })
//
//      var self = this;
//      this.$API.getLesson(function (lessons) {
////        self.lessonList = self.handleData(lessons['results'])
////        console.log(self.handleData(lessons['results']))
//        self.lessonList = [
//          {"isPublished":false,
//            "updatedAt":"2018-02-04T07:22:24.292Z",
//            "name":"\u513f\u6b4c\u8bfe\u7a0b1","createdAt":"2018-01-30T07:23:23.473Z",
//            "materials":[],"version_code":0
//          }
//        ]
//      })

    },
    methods: {}
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
