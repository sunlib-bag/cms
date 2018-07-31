<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" :isAdmin="isAdmin" :isManager="isManager"></side_bar>
    </el-aside>
    <el-main class="big-main">
      <el-select v-model="group" @change="changeWeChatGroup" placeholder="请选择">
        <el-option
          v-for="item in groupList"
          :key="item.objectId"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>

      <el-table
        ref = "weChatHistoryList"
        :data="weChatHistoryList"
        class="table">
        <el-table-column
          prop="group"

          label="群名称"
        >
        </el-table-column>
        <el-table-column
          prop="user"

          label="用户"
        >
        </el-table-column>
        <el-table-column

          :min-width="300"
          label="内容"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.content">
                {{scope.row.content}}
            </span>
            <span v-if="scope.row.file">
              <a :href="scope.row.file.url" target="_blank">{{scope.row.file.name}}</a>({{scope.row.type}})
              <el-button type="text" @click="downLoad(scope.row.file.url, scope.row.file.name)">下载</el-button>
            </span>

          </template>

        </el-table-column>
        <el-table-column
          prop="createdAt"
          :formatter="formatDate"
          label="日期"
        >
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="weChatCount"
          :page-size="limit"
          @current-change="changePage">
        </el-pagination>
      </div>

    </el-main>
  </el-container>

</template>


<script>
  import SideBar from './side_bar/SideBar.vue'
  import {formatTime} from './filters/filters.js';
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";



  export default {
    data() {
      return {
        actionPage:'weChatHistoryList',
        isAdmin: true,
        group:'',
        weChatHistoryList:[],
        groupList:[],
        limit: 20,
        weChatCount: 0,
        isManager: false
      }
    },
    components: {

      ElButton,
      "side_bar": SideBar
    },

    mounted() {
      let self = this;
      this.$API.checkUserRole((roles) =>{
        this.isAdmin =  (roles.indexOf('admin')>=0);
        this.isManager =  (roles.indexOf('manager')>=0);
        if(!this.isAdmin){
          self.$router.push('/')
        }
      });
      $('.big-container').css('min-height', window.screen.height + 'px');
      this.init()

    },
    methods: {

      init:function(){
        this.$API.getWeChatGroups((groupList) => {
          this.groupList = groupList;
          this.group = groupList[0].name;
          this.getChatListHistory(groupList[0].name, 0)
        })
      },
      formatDate(row) {
        return formatTime(row.createdAt, "yyyy-MM-dd hh:mm:ss");
      },
      downLoad(url, name){
        this.$http.get(url, {
          responseType: 'arraybuffer'
        }).then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
      },
      changePage:function(page){
        this.getChatListHistory(this.group, page)
      },
      getChatListHistory: function(group, page){
        this.$API.getChatListHistory(group, page, this.limit ,(chatList) => {
            this.weChatHistoryList = chatList.result;
            this.weChatCount = chatList.count
          });
      },
      changeWeChatGroup:function(group){
        this.getChatListHistory(group, 0)
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

  .big-main {
    padding-left: 40px;
    padding-right: 40px;

  }
  .hide{
    display: none;
  }
  .c-chatList{
    width: 100%;
    border: 1px solid #e1f3d8;
    border-radius: 3px;
  }
  .c-chatList__item{
    display: flex;
    padding: 10px;
  }
  .c_chatList__item__userName{
    width: 80px;
    padding: 10px;
  }

  .c_chatList__item__content{
    max-width: 500px;
    padding: 10px;
    /*border: 1px solid #e1f3d8;*/
    /*border-radius: 10px;*/
    /*position: relative;*/
    /*background: white;*/
  }

  .c_item__content__ionic{
    border-left: 1px solid #e1f3d8;
    border-bottom: 1px solid #e1f3d8;
    position: absolute;
    background: white;
    width: 10px;
    height: 10px;
    left: -6px;
    top: 15px;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); 	/* IE 9 */
    -moz-transform:rotate(45deg); 	/* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg);
  }

  .min-header-container .el-aside {
    height: 80px;
    width: 150px;
    text-align: right;
  }

  .pagination {
    margin: 30px ;
    text-align: center;

  }

</style>
