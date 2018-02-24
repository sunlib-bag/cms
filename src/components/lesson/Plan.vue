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
        <vue-markdown :source="lessonInfo.plan.content"></vue-markdown>
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
      return {}
    },
    beforeDestroy(){
      this.$bus.$off("insertImage");
    },
    mounted(){
      this.$bus.on('insertImage', this.insertImage);
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
        this.insertAtCursor($markdown_edit[0], "<img src='" + selectImageInfo.file.url + "'>");
        this.lessonInfo.plan.content = $markdown_edit.val()
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
