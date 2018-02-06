<template>
  <div>
    <el-button @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
    <el-dialog  :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          用户管理
        </el-tab-pane>
        <el-tab-pane label="教案" name="second">
          配置管理
        </el-tab-pane>
        <el-tab-pane label="文件" name="third">
          角色管理
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>

</template>


<script>
  export default {
    name: 'NewLesson',
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(this.activeName);
      }
    }
  };
</script>
