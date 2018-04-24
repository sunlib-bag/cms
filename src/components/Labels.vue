<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <el-button type="success" @click="showCreateLabel"> 添加标签 </el-button>
      <el-table
        ref="label"
        :data="labelList">
        <el-table-column
          prop="name"
          label="标签名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="标签类别"
          :formatter="labelType"
          :filter-method="filterType"
          filter-placement="bottom-start"
          :filters="typeList">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="showEditLabel(scope.row)">编辑</el-button>
            <el-button type="text" size="small"  class="red" @click="deleteLabel(scope.row.objectId)">删除</el-button>
          </template>

        </el-table-column>

      </el-table>

    </el-main>


    <el-dialog :title="actionInfo+'标签'" :visible.sync="labelInfoFormVisible">
      <el-form :model="labelInfo">
        <el-form-item label="标签名">
          <el-input v-model="labelInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签类别">
          <el-select v-model="labelInfo.type" placeholder="请选择标签类别">
            <el-option label="领域" :value=0></el-option>
            <el-option label="来源" :value=1></el-option>
            <el-option label="其他" :value=2></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="labelInfoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLabel">确 定</el-button>
      </div>
    </el-dialog>


  </el-container>


</template>

<script>
  import SideBar from './side_bar/SideBar.vue'



  export default {
    data() {
      return {
        lessonList: [],
        subjectFilter: [],
        actionPage: 'lessonList',
        isManagingEditor: false,
        isAdmin: false,
        labelList: [],
        labelInfoFormVisible: false,
        actionInfo: '创建',
        labelInfo: {},
        loading: '',
      typeList: [{text:'领域',value:0},{text:'来源',value:1},{text:'其他',value:2}]
      }
    },
    components: {
      "side_bar": SideBar
    },

    mounted() {
      let self = this;
      this.$API.checkUserRole((roles) => {
        this.isManagingEditor = (roles.indexOf('manager') >= 0);
        if (roles.length === 0) {
          self.$router.push('/')
        }
      });
      $('.big-container').css('min-height', window.screen.height + 'px');
      this.getLabelList()
    },
    methods: {
      getLabelList() {
//        this.openLoading();
        this.$API.getLabelList((labelList) => {
          this.labelList = labelList;
//          this.closeLoading()
        }, () => {
//          this.closeLoading()
        });
      },
      filterType(value, row){

        return value === row.type
      },
      labelType(row) {
        return ['领域', '来源', '其他'][row.type]
      },
      deleteLabel(labelId) {
        this.$API.deleteLabel(labelId, () => {
          this.$message({type: 'success', message: '删除成功！'});
          this.getLabelList()
        }, () => {
          this.$message({type: 'error', message: '删除失败！'});
        })
      },
      showCreateLabel() {
        this.labelInfo = {};
        this.actionInfo = '创建';
        this.labelInfoFormVisible = true
      },
      updateLabel() {
        let fuc = this.labelInfo.objectId ? this.$API.updateLabel : this.$API.createLabel;

        fuc(this.labelInfo, () => {
          this.$message({type: 'success', message: this.actionInfo + '成功！'});
          this.labelInfoFormVisible = false;
          this.getLabelList();
        }, function () {
          this.$message({type: 'error', message: this.actionInfo + '失败！'});
          this.labelInfoFormVisible = false;
        })
      },
      showEditLabel(label) {
        this.labelInfo = JSON.parse(JSON.stringify(label));
        this.actionInfo = '更新';
        this.labelInfoFormVisible = true;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .red{
    color: red;
  }

</style>
