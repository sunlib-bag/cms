<template>

  <el-form :model="lessonInfo" ref="lessonInfo" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="name">
      <el-input v-model="lessonInfo.name" :disabled="canEdit"></el-input>
    </el-form-item>
    <el-form-item label="所属科目" prop="region">
      <el-select v-model="lessonInfo.subject.objectId" placeholder="请选择所属科目" :disabled="canEdit">
        <el-option
          v-for="item in subjectFilter"
          :key="item.objectId"
          :label="item.title"
          :value="item.objectId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="所属领域" >
      <el-select v-model="lessonInfo.domain" multiple placeholder="请选择所属领域" :disabled="canEdit">
        <el-option
          v-for="item in domain"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="来源">
      <el-select v-model="lessonInfo.source" placeholder="请选择来源" :disabled="canEdit">
        <el-option
          v-for="item in sources"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="lessonInfo.plan.author" :disabled="canEdit"></el-input>
    </el-form-item>

    <el-form-item label="专题">
      <!--<el-input v-model="lessonInfo.misc" :disabled="canEdit"></el-input>-->
      <el-select v-model="lessonInfo.topics" multiple placeholder="请选择所属专题" :disabled="canEdit">
        <el-option
          v-for="item in topicList"
          :key="item.objectId"
          :label="item.title"
          :value="item.objectId">
        </el-option>
      </el-select>
    </el-form-item>



    <el-form-item label="其他标签">
      <!--<el-input v-model="lessonInfo.misc" :disabled="canEdit"></el-input>-->
      <el-select v-model="lessonInfo.misc" multiple placeholder="请选择所属领域" :disabled="canEdit">
        <el-option
          v-for="item in other"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
          misc: [],
          plan: '',
          materials: [],
          topics:[]
        },
      },
      subjectFilter:{
        default:[]
      },
      canEdit:{
        default: false
      }

    }
    ,
    data() {
      return {
        domain: [

        ],
        sources: [

        ],
        other:{
          default:[]
        },
        topicList:{
          default:[]
        }
      }
    },
    watch: {
      lessonInfo: function (value) {

      }
    },
    mounted(){
      this.getLabelList();
      this.getTopicList()
    },
    methods:{
      getLabelList() {
        this.$API.getLabelList((labelList) => {
          this.sources = this.handelLabelList(labelList, 1);
          this.domain = this.handelLabelList(labelList, 0);
          this.other = this.handelLabelList(labelList,2)
        }, () => {

        })
      },
      getTopicList(){
        this.$API.getTopicList(1, 30,(topicList)=>{
//          console.log(topicList)
//          console.log(topicList.result)
            this.topicList =  topicList.result
        })
      },
      handelLabelList(labelList, type) {
        let sourceList = [];
        for (let i = 0; i < labelList.length; i++) {
          if (labelList[i].type === type) {
            sourceList.push({text: labelList[i].name, value: labelList[i].name})
          }
        }
        return sourceList;
      },
    }

  }

</script>
<style>
  .el-select {
    display: block;
  }
</style>
