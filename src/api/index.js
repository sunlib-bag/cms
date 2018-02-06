let Api = {};
var md5 = require('js-md5')

Api.install = function (Vue, options) {
  
  function Api() {
    this.base_url = "https://cqbvih8f.api.lncld.net/1.1";
    this.appId = Vue.prototype.$config.APP_ID;
    this.appKey = Vue.prototype.$config.APP_KEY;
  }
  
  Api.prototype.login = function (data, cb) {
    
    var headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/login',
      headers: headers,
      data: data,
      method: 'post',
      success: function (data) {
        localStorage.setItem('sessionToken', data.sessionToken)
        // cb(data)
      }, error: function () {
      
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
  
  Api.prototype.deleteLesson =  function(id,cb){
    let headers = this.getHeaders();
    $.ajax({
      url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson/'+id,
      method: 'delete',
      headers: headers,
      success: function (data) {
        cb(data)
      }, error: function () {
      
      }
    })
  }
  
  Api.prototype.getHeaders = function (type) {
    var time = new Date().getTime();
    var headers = {
      "X-LC-Id": this.appId,
      "X-LC-Sign": md5(time + this.appKey)+","+time,
      "Content-Type": "application/json"
    };
    if (localStorage.getItem('sessionToken')) {
      headers['X-LC-Session'] = localStorage.getItem('sessionToken')
    }
    return headers
  };
  
  let api = new Api();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


