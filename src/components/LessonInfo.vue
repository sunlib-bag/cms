<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <el-form :model="lessonInfo" :rules="rules" ref="lessonInfo" label-width="100px" class="demo-ruleForm">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="baseInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" prop="name">
                  <el-input v-model="lessonInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="所属科目" prop="region">
                  <el-select v-model="lessonInfo.subjectId" placeholder="请选择所属科目">
                    <el-option
                      v-for="item in subjectFilter"
                      :key="item.id"
                      :label="item.attributes.title"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="所属领域" required>
                  <el-select v-model="lessonInfo.domain" multiple placeholder="请选择所属领域">
                    <el-option
                      v-for="item in domain"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="来源" required>
                  <el-select v-model="lessonInfo.source" placeholder="请选择来源">
                    <el-option
                      v-for="item in sources"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input v-model="lessonInfo.author"></el-input>
                </el-form-item>
                <el-form-item label="其他标签">
                  <el-input v-model="lessonInfo.misc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<base-info :lessonInfo="lessonInfo"></base-info>-->
          </el-tab-pane>
          <el-tab-pane label="教案" name="plan">

            <el-row>
              <el-col class="markdown-container" :span="12">
                <el-row class="markdown-title">
                  <el-col :span="4">编辑</el-col>
                  <el-col :span="20">
                    <insert-image :lessonMaterials="lessonInfo.materials"></insert-image>
                  </el-col>
                </el-row>


                <el-input id="markdown_editor"
                          type="textarea"
                          placeholder="请输入内容"
                          :rows="30"
                          v-model="plan">
                </el-input>

              </el-col>
              <el-col :span="12" class="markdown-container">

                <div class="markdown-title">预览</div>
                <div class="markdown-preview-container">
                  <vue-markdown :source="planHtml"></vue-markdown>
                </div>
              </el-col>
            </el-row>
            <div></div>

          </el-tab-pane>
          <el-tab-pane label="文件" name="files">
            <mateiral :materials="lessonInfo.materials"></mateiral>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <el-dropdown split-button type="primary" class="save_btn" @command="publicLesson" @click="updateLesson">
        更新草稿
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>发布</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-main>
  </el-container>

</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import VueMarkdown from 'vue-markdown';
  import InsertImage from "./lesson/InsertImage.vue"
  import Mateiral from './lesson/Mateiral.vue'
  import baseInfo from "./lesson/baseInfo.vue"
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    data() {
      return {
        lessonImages: [],
        lessonList: [],
        plan: '',
        planHtml: '',
        actionPage: 'lessonList',
        materials: [],
        lessonInfo: {
          subjectId: '',
          domain: [],
          source: '',
          author: '',
          misc: '',
          plan: '',
          materials: []
        },
        subjectFilter: [],
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        domain: [
          {value: '健康', label: '健康'},
          {value: '语言', label: '语言'},
          {value: '社会', label: '社会'},
          {value: '科学', label: '科学'},
          {value: '艺术', label: '艺术'}
        ],
        sources: [
          {"value": "千千树", label: "千千树"},
          {"value": "儿童乐益会", label: "儿童乐益会"},
          {"value": "安利基金会", label: "安利基金会"},
          {"value": "广西师大出版社", label: "广西师大出版社"},
          {"value": "救助儿童会", label: "救助儿童会"},
          {"value": "信谊基金会", label: "信谊基金会"},
          {"value": "一公斤盒子", label: "一公斤盒子"},
          {"value": "澳门同济慈善会", label: "澳门同济慈善会"},
          {"value": "奕阳教育", label: "奕阳教育"},
          {"value": "通州儿童之家", label: "通州儿童之家"},
          {"value": "西部阳光基金会", label: "西部阳光基金会"},
          {"value": "农村小规模学校联盟", label: "农村小规模学校联盟"},
          {"value": "凉善公益", label: "凉善公益"},
        ],
        activeName: 'baseInfo'
      }
    },
    components: {
      ElButton,
      "side_bar": SideBar,
      'vue-markdown': VueMarkdown,
      'insert-image': InsertImage,
      "mateiral": Mateiral,
      "base-info": baseInfo
    },
    watch: {
      plan: function (value) {
        this.lessonInfo.plan = value;
        this.planHtml = value
      }
    },
    mounted() {
      let self = this;
      this.$API.checkUser(function (authenticated) {
        if (!authenticated) {
          return self.$router.push('/')
        }
        self.initPage();

        self.getSubjectList(function () {
          self.$API.getLessonInfo(self.$route.params.id, function (lesson) {
            let tagsInfo = self.handleTags(lesson.attributes.tags);
            let lessonInfo = {
              id: lesson.id,
              draft_version_code: lesson.attributes.draft_version_code,
              subjectId: lesson.attributes.subject.id,
              domain: tagsInfo.domain,
              source: tagsInfo.source,
              author: lesson.attributes.plan ? lesson.attributes.plan.attributes.author : undefined,
              misc: tagsInfo.misc,
              name: lesson.attributes.name,
              plan: lesson.attributes.plan ? lesson.attributes.plan.attributes.content : undefined,
              materials: self.handleMaterials(lesson.attributes.materials)
            };
//          self.materials = lessonInfo.materials;
            self.lessonInfo = lessonInfo;
            self.plan = lessonInfo.plan;

          }, function () {

          })
        });


      });

      this.$bus.on('insertImage', this.insertImage);
//      if (this.$route.params.id) {
//
//      }

      this.$bus.on('changeMaterial', function (value) {
        self.materials = value
      })


    },
    methods: {
     
      handleMaterials(materials) {

        let materialsInfo = [];
        for (let i = 0; i < materials.length; i++) {
          let material = {
            id: materials[i].id,
            name: materials[i].name,
            type: materials[i].type,
            index: materials[i].index,
          };
          if (materials[i].type !== 0) {
            material.url = materials[i].file.attributes.url
          } else {
            let atlas = [];
            for (let j = 0; j < materials[i].files.length; j++) {
              let imageInfo = materials[i].files[j];
              let image = {
                id: imageInfo.id,
                name: imageInfo.attributes.name,
                type: imageInfo.attributes.type,
                index: imageInfo.attributes.index,
                url: imageInfo.attributes.file.attributes.url
              };
              atlas.push(image)
            }
            material.files = atlas;
          }
          materialsInfo.push(material)
        }
        return materialsInfo


      },
      handleTags(tags) {
        let domain = [];
        let source;
        let misc;
        if (!tags) return {domain: domain, source: source, misc: misc}
        for (let i = 0; i < tags.length; i++) {
          let tagInfo = tags[i].split('.'); //todo
          if (tagInfo[0] === 'domain') {
            domain.push(tagInfo[1])
          }
          if (tagInfo[0] === 'source') {
            source = tagInfo[1]
          }
          if (tagInfo[0] === 'misc') {
            misc = tagInfo[1]
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
          self.subjectFilter = subjectList
          cb()
        }, function () {
        })
      },
      updateLesson(tab, event) {
        let lessonInfo = this.handleLessonInfo();



      },
      publicLesson() {
        console.log('publicLesson');
      }
      ,
      insertImage(selectImageInfo) {
        let $markdown_edit = $("#markdown_editor");
        this.insertAtCursor($markdown_edit[0], "<img src='" + selectImageInfo.url + "'>");
        this.plan = $markdown_edit.val()
      },
      handleLessonInfo() {

        let newLessonInfo = {};
        let lessonInfo = this.lessonInfo;
        newLessonInfo.plan = lessonInfo.plan;
        newLessonInfo.author =  lessonInfo.author;
        newLessonInfo.name = lessonInfo.name;
        newLessonInfo.draft_version_code = lessonInfo.draft_version_code + 1;
        newLessonInfo.subjectId = lessonInfo.subjectId;
        let tags = [];
        for (let i = 0; i < lessonInfo.domain.length; i++) {
          tags.push('domain.' + lessonInfo.domain[i])
        }
        if(lessonInfo.source){
          tags.push('source.' + lessonInfo.source);
        }
        if(lessonInfo.misc){
          tags.push('misc.'+lessonInfo.misc)
        }
        newLessonInfo.tags =  tags;


        return newLessonInfo

      },
      insertAtCursor(myField, myValue) {

        let document = window.document;
        if (document.selection) {
          myField.focus();
          let sel = document.selection.createRange();
          sel.text = myValue;
          sel.select();
        }

        //FireFox、Chrome等
        else if (myField.selectionStart || myField.selectionStart == '0') {
          let startPos = myField.selectionStart;
          let endPos = myField.selectionEnd;
          // 保存滚动条
          let restoreTop = myField.scrollTop;
          myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

          if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
          }

          myField.focus();
          myField.selectionStart = startPos + myValue.length;
          myField.selectionEnd = startPos + myValue.length;
        } else {
          myField.value += myValue;
          myField.focus();
        }
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

  .markdown-title {
    height: 50px;
    line-height: 50px;
  }

  .el-select {
    display: block;
  }

  .markdown-container {
    padding: 12px;
  }

  .save_btn {
    position: absolute;
    top: 20px;
    right: 40px;
  }

  .markdown-preview-container {
    height: 642px;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    padding: 5px 15px;
    box-sizing: border-box;
    overflow: auto
  }
</style>
