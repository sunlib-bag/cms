<template>
  <el-container class="big-container">
    <el-aside class="big-side">
      <side_bar :actionPage="actionPage" ></side_bar>
    </el-aside>
    <div class="right-container">
      <div class="block">
        <el-date-picker
          v-model="dateRange"
          :editable="editDateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getDateRange"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" plain @click="getLearnUserActionFile()">下载是在助手数据统计文件</el-button>
    </div>

  </el-container>
</template>

<script>
  import SideBar from './side_bar/SideBar.vue'

    export default {
      data() {
        return {
          actionPage: 'learnUserAction',
          dateRange: [],
          editDateRange: false
        }
      },
      components: {
        "side_bar": SideBar,
      },

      mounted() {
        $('.big-container').css('min-height', window.screen.height + 'px')
        $('.big-side').css('min-height', window.screen.height + 'px')
      },
      methods: {
        getLearnUserActionFile(){
          if (this.dateRange.length === 0) {
            let endTime = new Date().getTime();
            let startTime = Date.now() - (30 * 24 * 60 * 60 * 1000);
            this.dateRange = [new Date(startTime), new Date(endTime)];
          }
          console.log(this.dateRange)
          var startDate = this.dateRange[0].getTime();
          var endDate = this.dateRange[1].getTime();
          //下载识字助手埋点数据整理成excel表格
          AV.Cloud.run('getExcelInfo',{dateRange:[startDate,endDate]}).then(function(data) {
            console.log(data);
            window.open(data.data);
            // 调用成功，得到成功的应答 data
          }, function(err) {
            console.log(err);
            // 处理调用失败
          });

        },
        getDateRange(selectDate) {
          let startTime = new Date(this.dateRange[0]).getTime();
          let endTime = new Date(this.dateRange[1]).getTime();
          if (startTime + 3600 * 1000 * 24 * 30 < endTime) { //判断开始时间+30天是否小于结束时间
            this.dateRange = [];
            this.$alert('日期范围最大为30天', '温馨提示', {confirmButtonText: '确定', type: 'info'})
          }
        },
      }
    }
</script>

<style scoped>

  .big-container {
    min-width: 1200px;
  }
  .right-container{
    margin-top: 100px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    height: 40px;
  }

  .big-side {
    width: 150px !important;
    border-right: solid 1px #e6e6e6;
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

</style>
