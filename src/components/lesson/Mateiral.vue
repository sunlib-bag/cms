<template>
  <div>
    <div v-show="isMaterialsShow">
      <div>
        <el-button>
          上传文件
        </el-button>
        <el-button>
          添加图集
        </el-button>
      </div>
      <div style="width: 320px;border: solid 1px #e6e6e6;margin-top: 10px">

        <!--<el-table-->
          <!--:data="materials"-->
          <!--style="width: 320px">-->
          <!--<el-table-column-->
            <!--width="50">-->
            <!--<template slot-scope="scope">-->

              <!--<span class='el-icon-picture' v-if="scope.row.type===3"></span>-->
              <!--<span class='el-icon-tickets' v-if="scope.row.type===2"></span>-->
              <!--<span class='el-icon-tickets' v-if="scope.row.type===1"></span>-->
              <!--<span class='el-icon-goods' v-if="scope.row.type===0"> </span>-->

            <!--</template>-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--prop="name"-->
            <!--width="200"-->
            <!--:cell-click="goToAtlas"-->
          <!--&gt;-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--prop="address"-->
            <!--width="70">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button type="text" icon="el-icon-edit" @click="edit(scope)"></el-button>-->
              <!--<el-button type="text" icon="el-icon-delete"></el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->


        <div v-for="material in materials" >
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
              <div @click="goToAtlas(material)">{{ material.name }}</div>
            </el-col>

            <el-col :span="5">
              <el-button type="text" icon="el-icon-edit" @click="edit(material)"></el-button>
              <el-button type="text" icon="el-icon-delete"></el-button>
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
          <el-button>长传图片</el-button>
        </div>
      </div>
      <div>
        <div class="table-container">
          <div v-for="image in images" class="image-container">
            <div class="extra-button-container"><el-button type="text" icon="el-icon-delete"></el-button></div>
            <div class="image-contain">
              <img style="width: 200px" :src="image.attributes.file.attributes.url">
            </div>

            <div>{{image.attributes.name}}<el-button type="text" icon="el-icon-edit" @click="edit(image)"></el-button></div>
          </div>
        </div>

      </div>

    </div>





  </div>

</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton,
      ElCol,
      ElRow},
    data() {
      return {
        materials: [{name: 1}, {name: 2}],
        isMaterialsShow: true,
        currentAtlasName:'图集',
        images:[]
      }
    },
    mounted() {
      let self = this;
      this.$API.getMaterials(this.$route.params.id, function (materials) {
        let materialsInfo = [];
        for (let i = 0; i < materials.length; i++) {
          let info = {
            name: materials[i].attributes.material.attributes.name,
            type: materials[i].attributes.material.attributes.type,
            id: materials[i].attributes.material.id

          };
          if (materials[i].attributes.material.attributes.type !== 0) {

            let type  = materials[i].attributes.material.attributes.file.attributes.name.split(".")[1];
            info.name = info.name + "." + type;
            info.url = materials[i].attributes.material.attributes.file.attributes.url
          }
          materialsInfo.push(info)
        }
        self.materials = materialsInfo


      }, function () {

      })
    },
    methods: {
      goToAtlas(material){
        console.log(material)
        var self = this;
        if(material.type === 0){
          this.isMaterialsShow = false;

          this.$API.getAtlasImage(material.id, function(images){
            console.log(images)
            self.images =  images;

          },function(){

          })
        }
      },
      edit(){
        this.$message({
          type: 'info',
          message: '发送成功'
        });
      },
      back(){
        this.isMaterialsShow = true;
        this.images =  [];
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
    float: left;
    height: 230px;
    width: 200px;
    position: relative;
    text-align: center;
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
</style>
