<template>
  <div>
      <el-button @click="change">上传图片 </el-button>
      <input v-on:change="test" id="fileInput" type ='file' style="display:none"/>


  </div>
</template>
<script>
  export default {

    data() {
      return {

      }
    },
    watch:{

    },

    methods: {
      test(value){
        if(!value) return
        let fileUploadControl = $('#fileInput')[0];

        if (fileUploadControl.files.length > 0) {
          let localFile = fileUploadControl.files[0];


          this.$API.createMaterial(localFile.name, localFile,function(result){
            console.log(result)
            $("#fileInput").val('')
          })

//          let file = new AV.File(name, localFile);
//          file.save().then(function(file) {
//            console.log(file.url());
//          }, function(error) {
//            // 异常处理
//            console.error(error);
//          });
        }

      },
      change(){
        console.log('===========click')
        $("#fileInput").click()
      }
    }
  }
</script>
