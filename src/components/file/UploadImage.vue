<template>
  <div>
    <el-form-item label="封面" prop="desc">
      <el-upload
        class="upload-demo"
        action=""
        list-type="picture"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :multiple=this.multiple
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :httpRequest="httpRequest"
        :file-list="fileList"
        :accept="'image/*'">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    props:{
        multiple: {
          type: Boolean,
          defalut: false
        },
        isUpload:{
          type:Boolean,
          defalut:true
        },
        fileList:{
          type:Array,
          defalut:[]
        }
    },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
//        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleChange(file, fileList) {
        if(!this.isUpload) return;
        this.fileList = fileList.slice(-1)
      },
      httpRequest(option) {
        function getBody(xhr) {
          const text = xhr.responseText || xhr.response;
          if (!text) {
            return text;
          }
          try {
            return JSON.parse(text);
          } catch (e) {
            return text;
          }
        }

        option.action = "https://cqbvih8f.api.lncld.net/1.1/files/" + option.file.name;
        option.headers = {
          "X-LC-Id": this.$config.APP_ID,
          "X-LC-Key": this.$config.APP_KEY,
          "Content-Type": option.file.type
        }
        if (typeof XMLHttpRequest === 'undefined') {
          return;
        }
        const xhr = new XMLHttpRequest();
        const action = option.action;

        if (xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
          };
        }

        const formData = new FormData();

        if (option.data) {
          Object.keys(option.data).forEach(key => {
            formData.append(key, option.data[key]);
          });
        }

        formData.append(option.filename, option.file);

        xhr.onerror = function error(e) {
          option.onError(e);
        };

        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr));
          }

          option.onSuccess(getBody(xhr));
        };

        xhr.open('post', action, true);

        if (option.withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true;
        }

        const headers = option.headers || {};

        for (let item in headers) {
          if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
          }
        }
        xhr.send(formData);
        return xhr;
      }

    }
  }
</script>
