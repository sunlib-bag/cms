let Api = {};
var md5 = require('js-md5')

Api.install = function (Vue, options) {
  
  function Api() {
    this.base_url = "https://cqbvih8f.api.lncld.net/1.1";
    this.appId = Vue.prototype.$config.APP_ID;
    this.appKey = Vue.prototype.$config.APP_KEY;
  }
  
  
  Api.prototype.login = function (data, sucFuc, errFuc) {
    
    let headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/usersByMobilePhone',
      headers: headers,
      data: data,
      method: 'post',
      success: function (data) {
        localStorage.setItem('sessionToken', data.sessionToken);
        sucFuc(data)
        
      }, error: function (data) {
        errFuc(data)
        
      }
    })
  };
  
  Api.prototype.getLesson = function (cb) {
    var headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson?include=subject',
      method: 'GET',
      headers: headers,
      success: function (data) {
        cb(data)
      }, error: function () {
      
      }
    })
  };
  
  Api.prototype.deleteLesson = function (id, cb) {
    let headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson/' + id,
      method: 'delete',
      headers: headers,
      success: function (data) {
        cb(data)
      }, error: function () {
      
      }
    })
  };
  Api.prototype.sendSMSCode = function (data, sucFuc, errFuc) {
    let headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/requestSmsCode',
      method: 'POST',
      headers: headers,
      data: data,
      success: function (data) {
        sucFuc(data)
      }, error: function () {
        errFuc()
      }
    })
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
    let headers = this.getHeaders();
    $.ajax({
      url: this.base_url + '/classes/Subject',
      method: 'GET',
      headers: headers,
      success: function (data) {
        sucFuc(data)
      }, error: function () {
        errFuc()
      }
    })
  };
  Api.prototype.getLessonInfo = function (lessonId, sucFuc, errFuc) {
    
    // window.AV.init({
    //   appId: this.appId,
    //   appKey: this.appId
    // });
    //
    // var query = new AV.Query('Lesson');
    // query.include('subject');
    // query.include('plan');
    // query.descending('createdAt');
    // query.find().then(function (products) {
    //   console.log(products)
    // }).catch(function(error) {
    //
    // });
  
    
    let headers = this.getHeaders();
    $.ajax({
      url: this.base_url + '/classes/Lesson/' + lessonId + "?include=subject%2Cplan",
      method: 'GET',
      headers: headers,
      success: function (data) {
        sucFuc(data)
      }, error: function () {
        errFuc()
      }
    })
  };
  
  let api = new Api();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


