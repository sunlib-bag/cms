import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  config from "../config"
import api from "../api/index"
import ElementUI from 'element-ui'


Vue.use(ElementUI);
Vue.use(Router);
Vue.use(config);
Vue.use(api);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
