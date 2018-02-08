<template>
  <div>
    <div>
      <el-button>
        上传文件
      </el-button>
      <el-button>
        添加图集
      </el-button>
    </div>
    <div>
      <div v-for="material in materials">
        <el-row style="width: 300px">
          <el-col :span="5">
            <span class='el-icon-picture' v-if="material.type===3"></span>
            <span class='el-icon-tickets' v-if="material.type===2"></span>
            <span class='el-icon-goods' v-if="material.type===0"> </span>

          </el-col>
          <el-col :span="19">
            {{ material.name }}
          </el-col>
          <el-col>

          </el-col>
        </el-row>

      </div>
    </div>

  </div>

</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data() {
      return {
        materials: [{name: 1}, {name: 2}]
      }
    },
    mounted() {
      let self = this;
      this.$API.getMaterials(this.$route.params.id, function (materials) {
        let materialsInfo = [];
        for (let i = 0; i < materials.length; i++) {
          let info = {
            name: materials[i].attributes.material.attributes.name,
            type: materials[i].attributes.material.attributes.type
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
    methods: {}
  }
</script>
