let Api = {};
var md5 = require('js-md5')

Api.install = function (Vue, options) {
  
  function Api() {
    // this.base_url = "https://cqbvih8f.api.lncld.net/1.1";
    this.appId = Vue.prototype.$config.APP_ID;
    this.appKey = Vue.prototype.$config.APP_KEY;
  }
  
  
  Api.prototype.login = function (data, sucFuc, errFuc) {
  
    AV.User.logInWithMobilePhoneSmsCode(data.mobilePhoneNumber, data.smsCode).then(function (success) {
       sucFuc(success)
    }, function (error) {
      errFuc(error)
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/usersByMobilePhone',
    //   headers: headers,
    //   data: data,
    //   method: 'post',
    //   success: function (data) {
    //     localStorage.setItem('sessionToken', data.sessionToken);
    //     sucFuc(data)
    //
    //   }, error: function (data) {
    //     errFuc(data)
    //
    //   }
    // })
  };
  
  
  Api.prototype.sendSMSCode = function (phone, sucFuc, errFuc) {
  
    this.AV.User.requestLoginSmsCode(phone).then(function (success) {
      sucFuc(success)
    }, function (error) {
      errFuc()
      
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/requestSmsCode',
    //   method: 'POST',
    //   headers: headers,
    //   data: data,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  
  Api.prototype.getLesson = function (cb) {
  
    let query = new this.AV.Query('Lesson');
    query.include('subject');
    query.descending('createdAt');
    query.find().then(function (products) {
      cb(products)
    }).catch(function(error) {
      console.log(error)
    });
    
    // var headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson?include=subject',
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     cb(data)
    //   }, error: function () {
    //
    //   }
    // })
  };
  
  Api.prototype.deleteLesson = function (id, cb) {
  
  
    var todo = this.AV.Object.createWithoutData('Lesson', id);
    todo.destroy().then(function (success) {
      // 删除成功
      cb(success)
    }, function (error) {
      // 删除失败
    });
    
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson/' + id,
    //   method: 'delete',
    //   headers: headers,
    //   success: function (data) {
    //
    //   }, error: function () {
    //
    //   }
    // })
  };

  
  Api.prototype.getHeaders = function (type) {
    let time = new Date().getTime();
    let headers = {
      "X-LC-Id": this.appId,
      "X-LC-Sign": md5(time + this.appKey) + "," + time,
      "Content-Type": "application/json"
    };
    if (localStorage.getItem('sessionToken')) {
      headers['X-LC-Session'] = localStorage.getItem('sessionToken')
    }
    return headers
  };
  
  Api.prototype.getSubjectList = function (sucFuc, errFuc) {
  
    let query = new this.AV.Query('Subject');
    query.find().then(function (products) {
      sucFuc(products)
    }).catch(function(error) {
      console.log(error)
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: this.base_url + '/classes/Subject',
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  Api.prototype.getLessonInfo = function (lessonId, sucFuc, errFuc) {
    
    // window.AV.init({
    //   appId: this.appId,
    //   appKey: this.appId
    // });
    //
    var query = new AV.Query('Lesson');
    query.include('subject');
    query.include('plan');
    query.descending('createdAt');
    query.get(lessonId).then(function (products) {
          sucFuc(products)
    }).catch(function(error) {

    });
  
    
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: this.base_url + '/classes/Lesson/' + lessonId + "?include=subject%2Cplan",
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  
  Api.prototype.init = function(){
    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    })
    this.AV =  window.AV
  };
  
  
  
  let api = new Api();
  api.init();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


