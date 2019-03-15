let config = {};

config.install = function (Vue, options) {
  Vue.prototype.$config = {
    APP_ID: '',
    APP_KEY: ''
  }
};

module.exports = config;
