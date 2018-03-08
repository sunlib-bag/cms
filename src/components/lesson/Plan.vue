<template>
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
                v-model="lessonInfo.plan.content">
      </el-input>

    </el-col>
    <el-col :span="12" class="markdown-container">

      <div class="markdown-title">预览</div>
      <div class="markdown-preview-container">
        <vue-markdown :breaks = 'false' :source="plan"></vue-markdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import VueMarkdown from 'vue-markdown';
  import InsertImage from "../lesson/InsertImage.vue"

  export default {
    props: {

      lessonInfo: {
        materials: []
      }
    },
    data() {
      return {
        plan: ''
      }
    },
    beforeDestroy() {
      this.$bus.$off("insertImage");
    },
    mounted() {
      this.$bus.on('insertImage', this.insertImage);
    },
    watch: {
      lessonInfo: {
        handler: function (value) {
          let self = this;
          let reg = /\!\[[\s\S]*?\]\([\s\S]*?\)/g;
          if (!value.plan.content) return;
          this.plan = value.plan.content.replace(reg, function (imageUrl) {
            let imageInfo = imageUrl.split("(");
            let materialId = imageInfo[1].replace(')', '');
            imageInfo[1] = self.changeUrl(materialId, value)+')';
            return  imageInfo.join('(')
          })
          return value
        },
        deep: true
      }
    },

    methods: {
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
      },
      insertImage(selectImageInfo) {
        let $markdown_edit = $("#markdown_editor");
        let imageString = "!["+ selectImageInfo.name+"]("+ selectImageInfo.objectId +")";
        this.insertAtCursor($markdown_edit[0], imageString);
        this.lessonInfo.plan.content = $markdown_edit.val()
      },
      changeUrl(objectId, value) {
        let materials = value.materials;
        if(!materials) return objectId;
        for (let i = 0; i < materials.length; i++) {
          if (materials[i].objectId === objectId) {
            return materials[i].file.url
          }
          if (materials[i].files && materials[i].files.length > 0) {
            let files = materials[i].files;
            for (let j = 0; j < files.length; j++) {
              if(files[j].objectId === objectId){
                return files[j].file.url
              }
            }
          }
        }
        return objectId;
      }
    },
    components: {
      'vue-markdown': VueMarkdown,
      'insert-image': InsertImage
    }
  }


</script>
<style scoped="">
  .markdown-container {
    padding: 12px;
  }

  .markdown-preview-container {
    height: 642px;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    padding: 5px 15px;
    box-sizing: border-box;
    overflow: auto
  }

  .markdown-title {
    height: 50px;
    line-height: 50px;
  }

  .el-select {
    display: block;
  }
</style>
