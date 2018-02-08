<template>
  <div>
    <el-table
      :data="lessonList"
      style="width: 100%; text-align: left">
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-popover ref="popover5" placement="top" width="160" >
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button  size="mini" type="text"@click="hide($event)">取消</el-button>
              <el-button type="primary" size="mini">确定</el-button>
            </div>
          </el-popover>

          <el-button v-popover:popover5>删除</el-button>
        </template>

      </el-table-column>
    </el-table>


    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

  </div>

</template>


<script>
  export default {
    data() {
      return {
        visible2: false,
        lessonList:[{id:"12",visible2:false},{id:"13",visible2:false}],
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    mounted(){
      this.$API.test()
    }
    ,
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      hide(event){

          $(event.currentTarget).parent().parent().attr('aria-hidden',true).hide()
      }
    }
  }
</script>
