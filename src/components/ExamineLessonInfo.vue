<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage"></side_bar>
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

      <!--<el-dropdown split-button type="primary" class="save_btn" @command="publicLesson" @click="updateLesson">-->
        <!--更新草稿-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item>发布</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <div class="save_btn">
        <span>版本3</span>
        <span v-if="hadExamine">已审核</span><el-button v-if="!hadExamine" type="danger" @click="showExamineDialog">审核</el-button>
        <span v-if="hadPublic">已发布</span><el-button v-if="!hadPublic"  type="danger">发布</el-button>
      </div>

      <el-dialog
        title="请选择审核结果"
        :visible.sync="examineDialogVisible"
        width="30%">
        <el-radio v-model="examineResult" label='false'>通过</el-radio>
        <el-radio v-model="examineResult" label='true'>未通过</el-radio>

       <span slot="footer" class="dialog-footer">
            <el-button @click="examineDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="examineDialogVisible = false">提交审核</el-button>
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
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    data() {
      return {
        actionPage: 'lessonList',
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
        oldLeesonInfo: JSON.stringify({subject: {}, domain: [], source: '', author: '', misc: '', plan: '', materials: []}),
        isUpdate: -1
      }
    },
    components: {
      ElButton,
      "side_bar": SideBar,
      'vue-markdown': VueMarkdown,
      "mateiral": Mateiral,
      "base-info": baseInfo,
      "plan": Plan
    },
    watch: {

      lessonInfo: {
        handler: function (value) {
          if (this.isUpdate === -1) {
            this.isUpdate = false;
          }
          if (this.isUpdate === false) {
            this.isUpdate = true
          }

        },
        deep: true
      }
    },
    beforeDestroy(){
      this.$bus.$off("changeMaterial");
    },
    beforeRouteLeave(to, from, next) {
      let self = this;
      let isUpdate = this.isUpdateLesson();
      if (isUpdate === true) {
        this.$confirm('你正在编辑课程，离开将丢失为保存的部分', '确定离开本页', {
          confirmButtonText: '离开并保存',
          cancelButtonText: '留下',
          type: 'warning'
        }).then(() => {

          let lessonInfo = self.handleLessonInfo();
          self.$API.updateLesson(lessonInfo, function () {
            self.sendSuccessMessage("成功保存草稿");
            next(true)

          }, function () {
            self.sendErrorMessage('保存草稿失败!');
            next(false)

          })
        }).catch(() => {
          next(false)
        });
      } else {
        next(true)
      }


    },
    mounted() {
      let self = this;
      this.$API.checkUser(function (authenticated) {
        if (!authenticated) {
          return self.$router.push('/')
        }
        self.initPage();
        self.openLoading('正在加载数据');
        self.getSubjectList(function () {
          self.initLessonInfo(function(){self.closeLoading()},function(){self.closeLoading()})
        });
      });
      this.$bus.on('changeMaterial', function (value) {
        self.materials = value
      })

    },
    methods: {
      showExamineDialog(){
        this.examineDialogVisible =  true
      },
      initLessonInfo(sucFuc, errFuc){
        let self = this;
        self.$API.getLessonInfo(self.$route.params.id, function (lesson) {
          let newLessonInfo = JSON.parse(JSON.stringify(lesson));
          let tagsInfo = self.handleTags(newLessonInfo.tags);
          newLessonInfo.domain = tagsInfo.domain;
          newLessonInfo.source = tagsInfo.source;
          newLessonInfo.misc = tagsInfo.misc;
          self.oldLeesonInfo = JSON.stringify(newLessonInfo);
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
      isUpdateLesson() {
        return JSON.stringify(this.lessonInfo) !== this.oldLeesonInfo
      },


      handleTags(tags) {
        let domain = [];
        let source;
        let misc;
        if (!tags) return {domain: domain, source: source, misc: misc};
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
            misc = tagInfo.join('.')
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
      updateLesson() {
        let self = this;
        let lessonInfo = this.handleLessonInfo();
        this.openLoading('正在更新');
        this.$API.updateLesson(lessonInfo, function () {
          self.initLessonInfo(function(){
            self.closeLoading();
            self.sendSuccessMessage("成功保存草稿")
          })
        }, function () {
          self.closeLoading();
          self.sendErrorMessage('保存草稿失败!');
        })

      },
      publicLesson() {
        let self = this;
        let lessonInfo = this.handleLessonInfo();
        this.openLoading('正在发布');
        this.$API.updateLesson(lessonInfo, function () {
          self.initLessonInfo(function(){
            self.$API.publishLesson(lessonInfo.objectId, function () {
              self.closeLoading();
              self.sendSuccessMessage("成功发布")
            }, function (error) {
              self.closeLoading();
              self.sendErrorMessage('发布失败!');
            })
          })

        }, function () {
          self.closeLoading();
          self.sendErrorMessage('发布失败!');
        })
      },
      handleLessonInfo() {
        let newLessonInfo = JSON.parse(JSON.stringify(this.lessonInfo));
        let tags = [];
        for (let i = 0; i < newLessonInfo.domain.length; i++) {
          tags.push('domain.' + newLessonInfo.domain[i])
        }
        if (newLessonInfo.source) {
          tags.push('source.' + newLessonInfo.source);
        }
        if (newLessonInfo.misc) {
          tags.push('misc.' + newLessonInfo.misc)
        }
        newLessonInfo.tags = tags;
        return newLessonInfo

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
