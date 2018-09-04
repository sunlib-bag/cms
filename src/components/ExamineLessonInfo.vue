<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManager"></side_bar>
    </el-aside>
    <el-main class="big-main">

      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-row>
            <el-col :span="12">
              <base-info :lessonInfo="lessonInfo" :subjectFilter="subjectFilter" :canEdit="true"></base-info>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="教案" name="plan">
          <plan :lessonInfo="lessonInfo" :canEdit="true"></plan>


        </el-tab-pane>
        <el-tab-pane label="文件" name="files">
          <mateiral :materials="lessonInfo.materials" :canEdit="true"></mateiral>
        </el-tab-pane>
      </el-tabs>
      <div class="save_btn">
        <span>版本{{examineLessonInfo.draft_version_code}}</span>
        <span v-if="examineLessonInfo.isChecked !== 1">审核结果：{{examineLessonInfo.isChecked | formatState}}</span><el-button v-if="examineLessonInfo.isChecked === 1" type="danger" @click="showExamineDialog">审核</el-button>
        <span v-if="examineLessonInfo.isPublished">已发布</span><el-button v-if="!examineLessonInfo.isPublished"  :disabled="examineLessonInfo.isChecked!==3" type="danger" @click="publishLesson">发布</el-button>
      </div>

      <el-dialog
        title="请选择审核结果"
        :visible.sync="examineDialogVisible"
        width="30%">
        <el-radio v-model="examineResult" :label="true">通过</el-radio>
        <el-radio v-model="examineResult" :label= "false">未通过</el-radio>

       <span slot="footer" class="dialog-footer">
            <el-button @click="examineDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="examineLesson">提交审核</el-button>
        </span>
      </el-dialog>

    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import VueMarkdown from 'vue-markdown';
  import Plan from './lesson/Plan.vue';
  import Mateiral from './lesson/Mateiral.vue'
  import baseInfo from "./lesson/baseInfo.vue"
  import {formatState} from './filters/filters.js';


  export default {
    data() {
      return {
        actionPage: 'lessonList',
        isAdmin: false,
        isManager:false,
        materials: [],
        lessonInfo: {
          subject: {},
          domain: [],
          source: '',
          author: '',
          misc: '',
          plan: '',
          materials: []
        },
        hadExamine:true,
        hadPublic: true,
        examineResult: null,
        examineDialogVisible: false,
        subjectFilter: [],
        activeName: 'baseInfo',
        examineLessonInfo:{}
      }
    },
    filters:{
      formatState(state){
        return formatState(state)
      }
    },
    components: {

      "side_bar": SideBar,
      'vue-markdown': VueMarkdown,
      "mateiral": Mateiral,
      "base-info": baseInfo,
      "plan": Plan
    },

    mounted() {
      let self = this;
      this.$API.checkUserRole(function (roles) {
        self.isAdmin =  (roles.indexOf('admin')>=0);
        self.isManager = roles.indexOf('manager')>=0;
        if (roles.indexOf('manager') === -1) {
          return self.$router.push('/')
        }
        self.initPage();
        self.openLoading('正在加载数据');
        self.getSubjectList(function () {
          self.initLessonInfo(function(){self.closeLoading()},function(){self.closeLoading()})
        });
      });


    },
    methods: {
      showExamineDialog(){
        this.examineDialogVisible =  true
      },

      initLessonInfo(sucFuc, errFuc){
        let self = this;
        self.$API.getNeedExamineLessonInfo(self.$route.params.id, function (examineLessonInfo) {
          self.examineLessonInfo =  JSON.parse(JSON.stringify(examineLessonInfo));
          let lesson = examineLessonInfo.lessonInfo;


          let newLessonInfo = JSON.parse(JSON.stringify(lesson));
          let tagsInfo = self.handleTags(newLessonInfo.tags);
          newLessonInfo.domain = tagsInfo.domain;
          newLessonInfo.source = tagsInfo.source;
          newLessonInfo.misc = tagsInfo.misc;
          self.lessonInfo = newLessonInfo;
          if(sucFuc){
            sucFuc()
          }
        }, function () {
          if(errFuc){
            errFuc()
          }
          self.sendErrorMessage('该课程不存在!');
          self.$router.push({path: '/lessonList'})
        })
      },

      handleTags(tags) {
        let domain = [];
        let source;
        let misc = [];
        if (!tags) return {domain: domain, source: source, misc: misc};
        console.log(tags)
        for (let i = 0; i < tags.length; i++) {
          let tagInfo = tags[i].split('.'); //todo
          if (tagInfo[0] === 'domain') {
            tagInfo.shift();
            domain.push(tagInfo.join('.'))
          }
          if (tagInfo[0] === 'source') {
            tagInfo.shift();
            source = tagInfo.join('.')
          }
          if (tagInfo[0] === 'misc') {
            tagInfo.shift();
            misc.push(tagInfo.join('.'))
          }
        }
        return {domain: domain, source: source, misc: misc}
      },
      initPage() {
        $('.big-container').css('min-height', window.screen.height + 'px');
      },
      getSubjectList(cb) {
        let self = this;
        this.$API.getSubjectList(function (subjectList) {
          self.subjectFilter = subjectList;
          cb()
        }, function () {
          self.sendErrorMessage('获取科目列表失败!');
        })
      },
      examineLesson() {
        let self = this;
        if(this.examineResult === null) return this.sendErrorMessage('请选择审核结果！');
        this.$API.sendExamineResult(this.examineLessonInfo.objectId, this.examineResult ,function(result){

            self.examineLessonInfo.isChecked=  result.isChecked;
            self.examineDialogVisible =  false;
            self.sendSuccessMessage("审核结果提交成功")

        },function(){
          self.examineDialogVisible =  false;
          self.sendErrorMessage("审核结果提交失败")
        })


      },
      publishLesson() {
        let self = this;
        if(this.examineLessonInfo.isChecked !== 3) return this.sendErrorMessage('请先通过审核!');
        this.openLoading('正在发布');
        this.$API.publishLesson(this.examineLessonInfo.lessonId, this.examineLessonInfo.draft_version_code, function(result){
            self.closeLoading();
            self.examineLessonInfo.isPublished=  true;
            self.sendSuccessMessage("成功发布")
        },function(error){
          self.closeLoading();
          self.sendErrorMessage('发布失败!');
        })
      },

      sendErrorMessage(message){
        this.$message({
          type: 'error',
          message: message
        });
      },
      sendSuccessMessage(message){
        this.$message({
          type: 'success',
          message: message
        });
      },
      openLoading(message) {
        this.loading = this.$loading({
          lock: true,
          text: message,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      closeLoading(){
        this.loading.close();
      }

    }
  }
</script>
<style scoped>
  .save_btn span{
    padding-right: 12px ;
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





  .save_btn {
    position: absolute;
    top: 20px;
    right: 40px;
  }


</style>
