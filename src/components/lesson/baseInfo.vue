<template>
  <div>
      <el-row>
        <el-col :span="12">
          <el-form :model="lessonInfo" :rules="rules" ref="lessonInfo" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
              <el-input v-model="lessonInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="所属科目" prop="region">
              <el-select v-model="lessonInfo.subjectId" placeholder="请选择所属科目"><el-option
                v-for="item in subjectFilter"
                :key="item.id"
                :label="item.attributes.title"
                :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属领域" required>
              <el-select v-model="lessonInfo.domain" multiple placeholder="请选择所属领域">
                <el-option
                  v-for="item in domain"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="来源" required>
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
              <el-input v-model="lessonInfo.author"></el-input>
            </el-form-item>
            <el-form-item label="其他标签">
              <el-input v-model="lessonInfo.misc"></el-input>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>

  </div>

</template>
<script>
  export  default {
    props:{
      lessonInfo:{
        default:  {
          subjectId: '',
          domain: [],
          source: '',
          author: '',
          misc: '',
          plan: '',
          Material: [{name: '', file: []}, {name: '', files: []}]
        }
      }
    }
    ,
    data(){
      return{
//        lessonInfo: this.lesson,
        subjectFilter:[],
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        domain: [
          {value: '健康', label: '健康'},
          {value: '语言', label: '语言'},
          {value: '社会', label: '社会'},
          {value: '科学', label: '科学'},
          {value: '艺术', label: '艺术'}
        ],
        sources:[
          {"value":"千千树",label:"千千树"},
          {"value":"儿童乐益会",label:"儿童乐益会"},
          {"value":"安利基金会",label:"安利基金会"},
          {"value":"广西师大出版社",label:"广西师大出版社"},
          {"value":"救助儿童会",label:"救助儿童会"},
          {"value":"信谊基金会",label:"信谊基金会"},
          {"value":"一公斤盒子",label:"一公斤盒子"},
          {"value":"澳门同济慈善会",label:"澳门同济慈善会"},
          {"value":"奕阳教育",label:"奕阳教育"},
          {"value":"通州儿童之家",label:"通州儿童之家"},
          {"value":"西部阳光基金会",label:"西部阳光基金会"},
          {"value":"农村小规模学校联盟",label:"农村小规模学校联盟"},
          {"value":"凉善公益",label:"凉善公益"},
        ],
      }
    },
    watch: {
      lessonInfo: function(value){
         console.log(value)
      }
    },
    methods:{

    }

  }

</script>
<style>
  .el-select {
    display: block;
  }
</style>
