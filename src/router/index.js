import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import LessonList from '@/components/LessonList'
import NewLesson from '@/components/NewLesson'
import NewLessonBaseInfo from '@/components/lesson/NewLessonBaseInfo.vue'
import Plan from '@/components/lesson/Plan.vue'
import Login from '@/components/Login.vue'
import test from '@/components/test'

import md5 from 'js-md5';


import config from "../config"
import Api from "../api/index"
import ElementUI from 'element-ui'


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
      path: '/newLesson',
      name: 'NewLesson',
      component: NewLesson
    },
    {
      path: '/newLessonBaseInfo',
      name: 'NewLessonBaseInfo',
      component: NewLessonBaseInfo
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
