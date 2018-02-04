<template>
  <el-table
    :data="tableData"
    style="width: 100%; text-align: left">
    <el-table-column
      prop="course_name"
      label="课程名称"
      width="100">
    </el-table-column>
    <el-table-column
      :filters="[{ text: 'test', value: 'test' }, { text: 'ui', value: 'ui' }]"
      :filter-method="filterTag"
      filter-placement="bottom-start"
      prop="course_type"
      label="科目"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="来源"
      filter-placement="bottom-start"
      :filters="[{ text: 'test', value: 'test' }, { text: 'ui', value: 'ui' }]"
      :filter-method="filterTag"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="创建日期"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="状态"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      >
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    name: 'NewCourse',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          course_type:"test"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          course_type:"test"
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          course_type:"test"
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          course_type:"ui"
        }]
      }
    },
    methods:{
      filterTag(value, row) {
        return row.course_type === value ;
      }

    }
  }
</script>
