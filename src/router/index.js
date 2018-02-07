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
      path:'/lessonInfo',
      name: 'lessonInfo',
      component: LessonInfo
    },
    {
      path:'/lessonInfo/:id',
      name: 'lessonInfo',
      component: LessonInfo
    },
    {
      path: '/newLesson',
      name: 'NewLesson',
      component: NewLesson
    },
   
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
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
