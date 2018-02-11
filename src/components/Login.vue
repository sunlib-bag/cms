<template>
  <div class="main">
    <div class="login-container">
      <div class="title"><h3>用户登录</h3></div>
      <div class='el-input-container'>
        <div class="lable">手机号：</div>
        <el-input v-model="phone"></el-input>
        <el-button type="text" class="extra-button" @click="sendSMSCode()" :disabled = isDisabled>{{SMSCodeText}}
        </el-button>
      </div>
      <div class='el-input-container'>
        <div class="lable">验证码：</div>
        <el-input v-model="verificationCode"></el-input>
      </div>
      <div class="el-input-container">
        <div class="lable"></div>
        <el-button class="big-button" type="primary" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton,
      ElInput
    },
    data() {
      return {
        verificationCode: '',
        phone: '',
        SMSCodeText: '发送验证码',
        isDisabled: false,
        timer:""
      }
    },
    mounted() {
      let self = this;
      this.$API.checkUser(function(authenticated){
        if(authenticated){
          self.$router.push({path: '/lessonList'})
        }
      })
    },
    methods: {
      login: function () {
        let self = this;
        let userInfo = {mobilePhoneNumber: this.phone, smsCode: this.verificationCode};
        this.$API.login(userInfo, function (result) {
          self.$message({
            type: 'success',
            message: '登录成功'
          });
          self.$router.push({path: '/lessonList'})
        }, function () {
          self.$message({
            type: 'error',
            message: '登录失败'
          });
        })
      },
      sendSMSCode: function () {
        let self = this;
        let maxTime = 30;
        this.isDisabled = true;
        clearInterval(this.timer);

        this.timer = setInterval(function () {
          maxTime--;
          self.SMSCodeText = "(" + maxTime + "s)";
          if (maxTime === 0) {
            self.SMSCodeText = '发送验证码';
            self.isDisabled = false;
            clearInterval(self.timer)
          }

        }, 1000);


        this.$API.sendSMSCode(this.phone, function (result) {
          self.$message({
            type: 'info',
            message: '发送成功'
          });
        }, function () {
          self.$message({
            type: 'info',
            message: '发送失败,检查手机号'
          });
        })
      }
    }

  }

</script>

<style scoped>
  .login-container {
    margin: auto;
    height: 340px;
    border: solid 1px #e6e6e6;
    padding-top: 20px;
    border-radius: 10px;
    width: 500px;
  }

  .el-input-container {
    width: 310px;
    margin: 7px auto;
    position: relative;
  }

  .el-input-container .lable {
    display: inline-block;
    width: 80px;

  }

  .el-input-container .el-input {
    width: 220px;
  }

  .el-input-container:last-child {
    margin-top: 20px;
  }

  .main {
    padding: 100px 0;
  }

  .big-button {
    width: 220px;
  }

  .title {
    padding: 0 10px;
  }

  .extra-button {
    position: absolute;
    top: 0;
    right: -82px;
    width: 72px;
    text-align: center;
  }

</style>
