<template>
  <div>
    <div v-show="isMaterialsShow">
      <div>
        <el-button @click="change('materialInput')" :disabled="canEdit">
          上传文件
        </el-button>

        <input v-on:change="createMaterial" id="materialInput" multiple="multiple" type='file' class="hide"/>
        <el-button @click="addAtlas" :disabled="canEdit">
          添加图集
        </el-button>
        <span class="color-dark-light warn">操作会实时保存，不要乱搞哦</span>
      </div>
      <div class="materialContainer">
        <div v-for="(material, index) in materials">
          <el-row class="materialList">
            <el-col :span="3">
              <div @click="goToAtlas(material)">
                <img src="/static/picture.png" v-if="material.type===3">
                <img src="/static/video.png" v-if="material.type===2">
                <img src="/static/music.png" v-if="material.type===1">
                <img src="/static/folder.png" v-if="material.type===0">
                <img src="/static/pdf.svg" v-if="material.type===4">
              </div>

            </el-col>
            <el-col :span="13">
              <div @click="goToAtlas(material,index)" class="materialName">{{ material.name }}</div>
            </el-col>
            <el-col :span="8">
              <el-button type="text" icon="el-icon-edit" @click="editMaterialFile(index,material)"
                         :disabled="canEdit"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="deleteMaterialFile(index,material)"
                         :disabled="canEdit"></el-button>
              <el-switch
                class="switch"
                value=material.isRepeatShow
                v-model="material.isRepeatShow"
                :active-value="true"
                :inactive-value="false"
                @change="changeMaterialIsShow(index,material)"
                active-color="#13ce66"
                inactive-color="#dcdfe5">
              </el-switch>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div v-show="!isMaterialsShow">
      <div class="table-container">
        <div class="left" @click="back"> 文件》 </div>
        <div class="left">{{currentAtlasName}}</div>
        <div class="left">
          <el-button @click="change('imageInput')" :disabled="canEdit">上传图片</el-button>
          <input v-on:change="changeImageInput" multiple="multiple" id="imageInput" type='file' accept="image/*" class="hide"/>
        </div>
      </div>
      <div>
        <div class="table-container">
          <div v-for="(image, imageIndex) in images.map(item=>item).sort((a,b)=> a.index>b.index )" class="mid-container">
            <div class="image-container">
              <div class="extra-button-container">
                <el-button type="text" icon="el-icon-delete" @click="deleteAtlasImage(imageIndex, image)"
                           :disabled="canEdit"></el-button>
              </div>
              <div class="image-contain">
                <img :src="image.file.url">
              </div>
              <div>
                <div class="atlasName">{{image.name}}</div>
                <el-button type="text" icon="el-icon-edit" @click="editAtlasImage(imageIndex,image)"
                           :disabled="canEdit"></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    components: {},
    props: {
      materials: {
        type: Array,
        default: []
      },
      canEdit: {
        default: false
      }
    },
    data() {
      return {
        isMaterialsShow: true,
        currentAtlasName: '',
        currentAtlasIndex: '',
        images: [],
        value1: true,
        value2: true,
        loading: ''
      }
    },
    watch: {
      materials: {
        handler: function (value) {
          console.log('===')
          this.$bus.emit('changeMaterial', value)
        },
        deep: true,
      }
    },
    methods: {
      goToAtlas(material, index) {
        if (material.type === 0) {
          this.isMaterialsShow = false;
          this.images = material.files;
          this.currentAtlasName = material.name;
          this.currentAtlasIndex = index;
        }
      },
      editMaterialFile(index, material) {
        let self = this;
        this.$prompt('请输入新文件名', '修改文件名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          self.openLoading('正在上传');
          self.$API.changeMaterialName(material, value, function (newMaterial) {
            self.materials[index].name = newMaterial.name;
            self.closeLoading();
          }, function () {
            self.closeLoading();
            self.$message({
              type: 'error',
              message: '修改失败!'
            });
          })
        }).catch(() => {
        });
      },
      deleteMaterialFile(index, material) {
        let self = this;
        let materials = JSON.parse(JSON.stringify(this.materials));
        self.openLoading('正在上传');
        this.$API.deleteMaterial(materials, index, function () {
          self.materials.splice(index, 1);
          self.closeLoading();
        }, function (code) {
          let message = (code == 403) ? '权限异常，删除失败' : '删除失败!';
          self.closeLoading();
          self.$message({
            type: 'error',
            message: message
          });
        });
      },
      changeMaterialIsShow(index,material){
        console.log("===============start=============")
        console.log(index);
        console.log(material);
        console.log("===============end=============")
      },
      createMaterial(value) {

        if (!value) return;
        let self = this;
        let fileUpload = $('#materialInput')[0];
        if (fileUpload.files.length > 0) {
          self.openLoading('正在上传');
          var allPromise = [];
          for (let i = 0; i < fileUpload.files.length; i++) {
            allPromise.push(this.saveOneMaterial(fileUpload.files[i]), i)
          }
          Promise.all(allPromise).then(function (result) {

            self.closeLoading();
            var failFiles = [];
            var successFiles = [];
            result.forEach(function (fileUploadResult) {
              if (!fileUploadResult.status) {
                failFiles.push(fileUploadResult.fileName)
              }else{
                successFiles.push(fileUploadResult.fileName)
              }
            });
            $("#materialInput").val('');
            if (failFiles.length > 0) {
              self.$message({
                type: 'error',
                message: '素材'+ failFiles.join(',') +'失败!'
              });
            }
            if (successFiles.length > 0) {
              self.$message({
                type: 'success',
                message: + successFiles.length +'个素材'+'成功!'
              });
            }


          })

//          let localFile = fileUpload.files[0];
//          self.openLoading('正在上传');
//          this.$API.createMaterial(this.$route.params.id, this.materials.length + 1, localFile.name, localFile, function (result) {
//            self.materials.push({
//              objectId: result.material.objectId,
//              name: result.material.name,
//              type: result.material.type,
//              file: result.material.file,
//              lessonMaterialId: result.objectId
//            });
//            self.closeLoading();
//            $("#materialInput").val('')
//          }, function () {
//            self.closeLoading();
//            self.$message({
//              type: 'error',
//              message: '添加素材失败!'
//            });
//          })
        }

      },

      saveOneMaterial(localFile, index) {
        let self = this;
        return new Promise(function (reslove, reject) {

          self.$API.createMaterial(self.$route.params.id, self.materials.length + 1 + index, localFile.name, localFile, function (result) {
            self.materials.push({
              objectId: result.material.objectId,
              name: result.material.name,
              type: result.material.type,
              file: result.material.file,
              lessonMaterialId: result.objectId
            });
            reslove({status: true, fileName: localFile.name})
          }, function () {
            reslove({status: false, fileName: localFile.name})
          })
        })
      },


      editAtlasImage(index, material) {
        let self = this;
        this.$prompt('请输入新文件名', '修改文件名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'

        }).then(({value}) => {
          self.openLoading('正在上传');
          self.$API.changeMaterialName(material, value, function (newMaterial) {
            self.materials[self.currentAtlasIndex].files[index].name = newMaterial.name
            self.closeLoading();
          }, function () {
            self.closeLoading();
            self.$message({
              type: 'error',
              message: '修改失败!'
            });
          })


        }).catch(() => {
        })
      },
      deleteAtlasImage(index, material) {
        let self = this;
        let atlasImage = JSON.parse(JSON.stringify(self.materials[self.currentAtlasIndex].files));
        self.openLoading('正在上传');
        this.$API.deleteAtlasMaterial(atlasImage, index, function () {
          self.materials[self.currentAtlasIndex].files.splice(index, 1)
          self.closeLoading();
        }, function (code) {
          let message = (code == 403) ? '权限异常,删除素材失败!' : '删除素材失败!';
          self.closeLoading();
          self.$message({
            type: 'error',
            message: message
          });
        })

      },
      back() {
        this.isMaterialsShow = true;
        this.images = [];
      },
      changeImageInput(value) {
        if (!value) return;
        let fileUpload = $('#imageInput')[0];
        let self = this;
        if (fileUpload.files.length > 0) {
          let localFile = fileUpload.files[0];
          self.openLoading('正在上传');
          var allPromise = [];
          for(var i =0; i < fileUpload.files.length; i++){
            allPromise.push(this.uploadOneImage(fileUpload.files[i], i))
          }
          Promise.all(allPromise).then(function(uploadResults){

            self.closeLoading();
            var failFiles = [];
            var successFiles = [];
            uploadResults.forEach(function (fileUploadResult) {
              if (!fileUploadResult.status) {
                failFiles.push(fileUploadResult.fileName)
              }else{
                successFiles.push(fileUploadResult.fileName)
              }
            });
            $("#imageInput").val('');
            if (failFiles.length > 0) {
              self.$message({
                type: 'error',
                message: '素材'+ failFiles.join(',') +'失败!'
              });
            }
            if (successFiles.length > 0) {
              self.$message({
                type: 'success',
                message: + successFiles.length +'个素材'+'成功!'
              });
            }


          })

//          this.$API.createAtlasMaterial(this.materials[this.currentAtlasIndex].objectId, (this.images.length + 1), localFile.name, localFile, function (result) {
//            self.materials[self.currentAtlasIndex].files.push(result);
//            self.images = self.materials[self.currentAtlasIndex].files;
//            $("#imageInput").val('');
//            self.closeLoading();
//          }, function () {
//            self.closeLoading();
//            self.$message({
//              type: 'error',
//              message: '添加素材失败!'
//            });
//          })
        }
      },
      addAtlas() {
        let self = this;
        self.openLoading('正在上传');
        this.$API.addAtlas(this.$route.params.id, (this.materials.length + 1),status, function (lessonMaterial) {
          self.materials.push({
            objectId: lessonMaterial.material.objectId,
            name: lessonMaterial.material.name,
            files: [],
            type: lessonMaterial.material.type,
            index: lessonMaterial.index,
            lessonMaterialId: lessonMaterial.objectId,
            status:self.isMaterialsShow,
          })
          self.closeLoading();
        }, function () {
          self.closeLoading();
          self.$message({
            type: 'error',
            message: '添加素材失败!'
          });
        })
      },


      uploadOneImage(localFile, index){
        var self = this;
        return new Promise(function(reslove, reject){
          self.$API.createAtlasMaterial(self.materials[self.currentAtlasIndex].objectId, (self.images.length + 1 + index), localFile.name, localFile, function (result) {
            self.materials[self.currentAtlasIndex].files.push(result);
            self.images = self.materials[self.currentAtlasIndex].files;
            reslove({status: true, fileName: localFile.name})

          }, function () {
            reslove({status: false, fileName: localFile.name})
          })
        })



      },


      change(id) {
        $("#" + id).click()
      },
      openLoading(message) {
        this.loading = this.$loading({
          lock: true,
          text: message,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      closeLoading() {
        this.loading.close();
      }

    }
  }
</script>
<style>
  .left {
    float: left;
    height: 50px;
    line-height: 50px;
  }

  .left:last-child {
    margin-left: 50px;
  }

  .image-container {
    position: relative;
    text-align: center;
  }

  .mid-container {
    float: left;
    height: 250px;
    width: 200px;
    padding: 10px;

  }

  .image-contain {
    height: 200px;
    width: 200px;
    border: 1px solid #e6e6e6;
    overflow: hidden;
  }

  .extra-button-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .table-container {
    padding-bottom: 20px;
    display: table;
  }

  .materialName {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .atlasName {
    width: 150px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .materialList {
    width: 350px;
    padding: 5px;
    border-bottom: solid 1px #e6e6e6;
    line-height: 51px;
  }

  .materialList img {
    height: 12px;
  }

  .warn {
    color: #909399
  }

  .hide {
    display: none
  }

  .materialContainer {
    width: 350px;
    border: solid 1px #e6e6e6;
    margin-top: 10px
  }

  .image-contain img {
    width: 200px
  }
  .switch{
    margin-left: 5px;width: 32px
  }
</style>
