<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManager"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <h1>专题列表</h1>
      <div class="o-title">
        <span>当前推荐专题{{recommendCount}}</span>
        <el-button class="o-title__button"  @click="goToCreateTopic"> 添加专题</el-button>
      </div>

      <div>
        <el-table
          :data="topicList"
          class="l-table">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建日期"
            :formatter="formatDate"
          >
          </el-table-column>
          <el-table-column
            prop="onLine"
            label="是否上线"
            :formatter="formatIsOnline">
          </el-table-column>
          <el-table-column
            prop="recommendStatus"
            label="推荐"
            :formatter="formatRecommendStatus">
          </el-table-column>

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="goToUpdateTopic(scope.row.objectId)">
                编辑
              </el-button>
              <el-button type="text" @click="updateTopicStatus(scope.row, 'onLine' , scope.$index)" v-if="!scope.row.onLine">
                上线
              </el-button>
              <el-button type="text" @click="updateTopicStatus(scope.row, 'onLine',scope.$index)"  v-if="scope.row.onLine">
                下线
              </el-button>
              <el-button type="text" @click="updateTopicStatus(scope.row, 'recommendStatus', scope.$index)" v-if="!scope.row.recommendStatus">
                设为推荐
              </el-button>
              <el-button type="text" @click="updateTopicStatus(scope.row, 'recommendStatus', scope.$index)"  v-if="scope.row.recommendStatus">
                取消推荐
              </el-button>
              <el-button type="text"  class="warn"  @click="deleteTopic(scope.row.objectId, scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="topicCount"
          :page-size="size"

          @current-change="changePage">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import SideBar from './side_bar/SideBar.vue'
  import {formatTime, formatState, formatColor} from './filters/filters.js';


  export default {
    data() {
      return {
        actionPage: 'topic',
        isAdmin: false,
        isManager: false,
        recommendCount: 0,
        topicList: [],
        size: 5,
        topicCount: 0
      }
    },
    components: {
      "side_bar": SideBar

    },
    mounted() {

      let self = this;
      this.$API.checkUserRole((roles) =>{
        this.isAdmin =  (roles.indexOf('admin')>=0);
        this.isManager =  (roles.indexOf('manager')>=0);
        if(!this.isAdmin && !this.isManager){
          self.$router.push('/')
        }
      });
      this.getTopicList(1);
      this.getRecommendCount();
    },
    methods: {
      formatDate(row) {
        return formatTime(row.createdAt, "yyyy-MM-dd");
      },
      formatRecommendStatus(row){
        return row.recommendStatus ? '是':"否";
      },
      formatIsOnline(row){
        return row.onLine ? '是':"否";
      },
      getTopicList(page) {
        this.$API.getTopicList(page, this.size, (topicList) => {
          this.topicList = topicList.result;
          this.topicCount = topicList.count
        })
      },
      getRecommendCount(){
        this.$API.getRecommendCount((recommendCount) => {
          this.recommendCount = recommendCount.count;
        })
      },
      goToUpdateTopic(topicId){
        this.$router.push('/updateTopic/'+topicId )
      },
      goToCreateTopic(){
        this.$router.push('/newTopic')
      },
      changePage(page){
        this.getTopicList(page)
      },
      updateTopicStatus(topic,type ,index){
        let topicStatus = {objectId: topic.objectId};
        console.log(type);
        console.log(topicStatus[type]);
        topicStatus[type] =  !topic[type];
        console.log(topicStatus[type]);
        if(type == 'recommendStatus'){
          var changeCount = topicStatus[type] ? 1 : -1;
          this.recommendCount = this.recommendCount + changeCount
        }
        this.$API.updateTopicStatus(topicStatus,(topicInfo)=>{
          this.topicList[index][type] =  !topic[type]
        },()=>{
          this.$message({
            type: 'error',
            message: '更新专题失败！'
          })
        })
      },
      deleteTopic(id,index){
        this.$API.deleteTopic(id,()=>{
          this.topicList.splice(index, 1);
        },()=>{})
      }
    }
  }
</script>
<style scoped>

  .big-container {
    min-width: 1200px;
  }

  .big-side {
    width: 150px !important;
    border-right: solid 1px #e6e6e6
  }
  .l-table{
    min-width: 1100px;
  }
  .big-main {
    padding-left: 40px;
    padding-right: 40px;
    position: relative;

  }
  .warn {
    color: #F56C6C;
  }

  .pagination {
    padding: 20px;
    text-align: center;
  }
  .o-title__button{
    float: right;
  }


</style>
