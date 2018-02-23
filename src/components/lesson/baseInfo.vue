<template>

  <el-form :model="lessonInfo" ref="lessonInfo" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="name">
      <el-input v-model="lessonInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="所属科目" prop="region">
      <el-select v-model="lessonInfo.subject.objectId" placeholder="请选择所属科目">
        <el-option
          v-for="item in subjectFilter"
          :key="item.objectId"
          :label="item.title"
          :value="item.objectId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="所属领域" >
      <el-select v-model="lessonInfo.domain" multiple placeholder="请选择所属领域">
        <el-option
          v-for="item in domain"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="来源">
      <el-select v-model="lessonInfo.source" placeholder="请选择来源">
        <el-option
          v-for="item in sources"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="lessonInfo.plan.author"></el-input>
    </el-form-item>
    <el-form-item label="其他标签">
      <el-input v-model="lessonInfo.misc"></el-input>
    </el-form-item>
  </el-form>

</template>
<script>
  export default {
    props: {
      lessonInfo: {
        default: {
          subject: {},
          domain: [],
          source: '',
          author: '',
          misc: '',
          plan: '',
          materials: []
        },
      }
      ,
      subjectFilter:{
        default:[]
      }
    }
    ,
    data() {
      return {
        domain: [
          {value: '健康', label: '健康'},
          {value: '语言', label: '语言'},
          {value: '社会', label: '社会'},
          {value: '科学', label: '科学'},
          {value: '艺术', label: '艺术'}
        ],
        sources: [
          {"value": "千千树", label: "千千树"},
          {"value": "儿童乐益会", label: "儿童乐益会"},
          {"value": "安利基金会", label: "安利基金会"},
          {"value": "广西师大出版社", label: "广西师大出版社"},
          {"value": "救助儿童会", label: "救助儿童会"},
          {"value": "信谊基金会", label: "信谊基金会"},
          {"value": "一公斤盒子", label: "一公斤盒子"},
          {"value": "澳门同济慈善会", label: "澳门同济慈善会"},
          {"value": "奕阳教育", label: "奕阳教育"},
          {"value": "通州儿童之家", label: "通州儿童之家"},
          {"value": "西部阳光基金会", label: "西部阳光基金会"},
          {"value": "农村小规模学校联盟", label: "农村小规模学校联盟"},
          {"value": "凉善公益", label: "凉善公益"},
        ],
      }
    },
    watch: {
      lessonInfo: function (value) {

      }
    },
    mounted(){

    }

  }

</script>
<style>
  .el-select {
    display: block;
  }
</style>
