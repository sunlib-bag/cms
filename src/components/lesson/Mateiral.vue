<template>
  <div>
    <div v-show="isMaterialsShow">
      <div>
        <el-button @click="change('materialInput')">
          上传文件
        </el-button>

        <input v-on:change="createMaterial" id="materialInput" type ='file' style="display:none"/>
        <el-button @click="addAtlas">
          添加图集
        </el-button>
      </div>
      <div style="width: 320px;border: solid 1px #e6e6e6;margin-top: 10px">
        <div v-for="(material, index) in materials" >
          <el-row  style="width: 300px;padding: 5px; border-bottom: solid 1px #e6e6e6;line-height: 51px;">
            <el-col  :span="3">
              <div @click="goToAtlas(material)">
                <span class='el-icon-picture' v-if="material.type===3"></span>
                <span class='el-icon-tickets' v-if="material.type===2"></span>
                <span class='el-icon-tickets' v-if="material.type===1"></span>
                <span class='el-icon-goods' v-if="material.type===0"> </span>
              </div>

            </el-col>
            <el-col :span="16" >
              <div @click="goToAtlas(material,index)" class="materialName">{{ material.name }}</div>
            </el-col>

            <el-col :span="5">
              <el-button type="text" icon="el-icon-edit" @click="editMaterialFile(index,material)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="deleteMaterialFile(index,material)"></el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div v-show="!isMaterialsShow">
      <div class="table-container">
        <div class="left" @click="back">  文件》 </div>
        <div class="left">{{currentAtlasName}}</div>
        <div class="left">
          <el-button @click="change('imageInput')">长传图片</el-button>
          <input v-on:change="changeImageInput" id="imageInput" type ='file' style="display:none"/>
        </div>
      </div>
      <div>
        <div class="table-container">
          <div v-for="(image, imageIndex) in images" class="mid-container">
            <div class="image-container">
              <div class="extra-button-container"><el-button type="text" icon="el-icon-delete" @click="deleteAtlasImage(imageIndex, image)"></el-button></div>
              <div class="image-contain">
                <img style="width: 200px" :src="image.url">
              </div>

              <div><div class="atlasName">{{image.name}}</div><el-button type="text" icon="el-icon-edit" @click="editAtlasImage(imageIndex,image)"></el-button></div>

            </div>

          </div>
        </div>

      </div>

    </div>





  </div>

</template>
<script>

  export default {
    components: {

    },
    props:{
      materials:{
        type: Array,
        default:[]
      }
    },
    data() {
      return {

        isMaterialsShow: true,
        currentAtlasName:'',
        currentAtlasIndex:'',
        images:[]
      }
    },
    watch:{
      materials:{
        handler:function(value){
          this.$bus.emit('changeMaterial',value)
        },
        deep: true
      }
    },
    mounted() {
      let self = this;
    },
    methods: {
      goToAtlas(material,index){

        let self = this;
        if(material.type === 0){
          this.isMaterialsShow = false;
          this.images = material.files;
          this.currentAtlasName =  material.name;
          this.currentAtlasIndex = index;
        }
      },
      editMaterialFile(index, material){
        let self = this;
        this.$prompt('请输入新文件名', '修改文件名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'

        }).then(({ value }) => {
          self.$API.changeMaterialName(material, value,function(newMaterial){
            self.materials[index].name = newMaterial.name

          })


        }).catch(() => {

        });
      },
      deleteMaterialFile(index, material){

        let self = this;
        this.$API.deleteMaterial(this.$route.params.id, material.id, function(){
          self.materials.splice(index, 1)
        });



      },

      editAtlasImage(index, material){
        let self = this;
        this.$prompt('请输入新文件名', '修改文件名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'

        }).then(({ value }) => {
//            let nameInfo = self.materials[index].name.split('.'); //todo
//
//            if(self.materials[self.currentAtlasIndex].files[index].type===0){
//
//              self.materials[self.currentAtlasIndex].files[index].name = value
//            }else{
//
//              self.materials[self.currentAtlasIndex].files[index].name = value+"."+nameInfo[1]
//            }

            self.$API.changeMaterialName(material, value,function(newMaterial){
              self.materials[self.currentAtlasIndex].files[index].name = newMaterial.name

            })





          }).catch(() => {
        })
      },
      deleteAtlasImage(index, material){
        var self = this;
        console.log(material)
        this.$API.deleteAtlasMaterial(material.id, function(){
          self.materials[self.currentAtlasIndex].files.splice(index, 1)
        })

      },
      back(){
        this.isMaterialsShow = true;
        this.images =  [];
      },
      createMaterial(value){
        if(!value) return;
        let self = this;
        let fileUploadControl = $('#materialInput')[0];
        if (fileUploadControl.files.length > 0) {
          let localFile = fileUploadControl.files[0];
          this.$API.createMaterial(this.$route.params.id, this.materials.length+1 ,localFile.name, localFile,function(result){
            self.materials.push({id: result.id,name: result.attributes.name, type:result.attributes.type, url:result.attributes.file.attributes.url})
            $("#materialInput").val('')
          })
        }

      },
      changeImageInput(value){

        if(!value) return;
        let fileUploadControl = $('#imageInput')[0];
        let self = this;

        if (fileUploadControl.files.length > 0) {
          let localFile = fileUploadControl.files[0];
          this.$API.createAtlasMaterial(this.materials[this.currentAtlasIndex].id,(this.images.length+1) ,localFile.name, localFile,function(result){

            self.materials[self.currentAtlasIndex].files.push({id: result.id,name: result.attributes.name, type:result.attributes.type, url:result.attributes.file.attributes.url})
            self.images =  self.materials[self.currentAtlasIndex].files;
            console.log(self.images)
            $("#imageInput").val('')
          })
        }
      },
      addAtlas(){
        let self = this;

        this.$API.addAtlas(this.$route.params.id, (this.materials.length+1) , function(material){
          let materialInfo = material
          self.materials.push({id:materialInfo.id, name: materialInfo.attributes.name, files:[], type: materialInfo.attributes.type, index: materialInfo.attributes.index})
        })

      }

      ,change(id){
        $("#"+id).click()
      }

    }
  }
</script>
<style>
  .left{
    float: left;
    height: 50px;
    line-height: 50px;
  }
  .left:last-child{
    margin-left: 50px;
  }
  .image-container{
    position: relative;
    text-align: center;
  }

  .mid-container{
    float: left;
    height: 250px;
    width: 200px;
    padding: 10px;

  }

  .image-contain{
    height: 200px;
    width: 200px;
    border: 1px solid #e6e6e6;
    overflow: hidden;
  }
  .extra-button-container{
    position: absolute;
    top:0;
    right: 0;
  }
  .table-container{
    padding-bottom: 20px;
    display: table;
  }
  .materialName{
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .atlasName{
    width: 150px;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
