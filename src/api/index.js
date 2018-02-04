let Api = {};

Api.install = function (Vue, options) {
  
  function Api() {
  
  }
  
  Api.prototype.init = function () {
    let config = Vue.prototype.$config;
    window.AV.init({
      appId: config.APP_ID,
      appKey: config.APP_KEY
    });
    this.AV = window.AV;
  };
  Api.prototype.getSubject = function (cb) {
    
    let query = new this.AV.Query('Course');
    query.include('todoFolder');
    query.get('5a7418be128fe1003da106fb').then(function (todo) {
      console.log(todo)
      cb(todo)
    }, function (error) {
      console.log(error)
    });
  };
  let api = new Api();
  api.init();
  Vue.prototype.$API = api
};

module.exports = Api;
