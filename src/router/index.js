import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import LessonList from '@/components/LessonList'
import NewLesson from '@/components/NewLesson'
import LessonInfo from '@/components/LessonInfo'
import Plan from '@/components/lesson/Plan.vue'
import Login from '@/components/Login.vue'
import test from '@/components/test'
import VueBus from 'vue-bus'


import md5 from 'js-md5';


import config from "../config"
import Api from "../api/index"
import ElementUI from 'element-ui'

Vue.use(VueBus);
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(config);
Vue.use(Api);

const Page1 = Vue.extend({
  template: '<div>1</div>',
  beforeRouteEnter(route, redirect, next) {
    next(vm => {
      console.log('In page 1')
    })
  },
  beforeRouteLeave(route, redirect, next) {
    console.log('Leave from page 1')
    next(vm => {})
  }
})



export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/lessonList',
      name: 'LessonList',
      component: LessonList
    },
    {
      path:'/lessonInfo/:id',
      name: 'lessonInfo',
      component: LessonInfo
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '*',
      name: 'Login',
      component: Login
    },
  ]
})
// Router.afterEach((to, from) => {
//   if(your condition){
//     next(false) //this will abort route navigation
//   }
// })
