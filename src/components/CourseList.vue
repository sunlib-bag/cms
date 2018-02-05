<template>
  <el-container>
    <el-aside width="150px">
      <side_bar></side_bar>
    </el-aside>
    <el-main>
      <div class="lesson-list" >
        <course_list >

        </course_list>

      </div>


    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import LessonList from './course/LessonList.vue'

  export default {
    data() {
      return {
        lessonList: []
      }
    },
    components: {
      "side_bar": SideBar,
      'course_list': LessonList
    },

    mounted() {
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
      this.lessonList = [
        {"isPublished":"NAME",
          "updatedAt":"2018-02-04T07:22:24.292Z",
          "name":"asdfadsf","createdAt":"2018-01-30T07:23:23.473Z",
          "materials":[],"version_code":0
        }
      ]
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
    methods: {
      handleData: function (lessons) {
        var new_lessons = [];
        for (var i = 0; i < lessons.length; i++) {
          var lesson={};
          lesson.name = lessons[i].name;
          lesson.createdAt = lessons[i].createdAt;
          lesson.isPublished =  lessons[i].isPublished;
          new_lessons.push(lessons)
        }
        return new_lessons;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container {
    height: 100%;
    min-width: 1000px;
  }

  .lesson-list {
    padding: 15px;
  }

</style>
