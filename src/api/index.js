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
    
    let query = new this.AV.Query('Lesson');
    query.get('5a701d6b0b61600044485e6d').then(function (todo) {
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
