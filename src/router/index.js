import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import CourseList from '@/components/CourseList'
import NewCourse  from '@/components/NewCourse'
import NewCourseBaseInfo  from '@/components/course/NewCourseBaseInfo.vue'
import Plan from '@/components/course/Plan.vue'
import Login from '@/components/Login.vue'
import test from '@/components/test'

import md5 from 'js-md5';




import  config from "../config"
import Api from "../api/index"
import ElementUI from 'element-ui'


Vue.use(ElementUI);
Vue.use(Router);
Vue.use(config);
Vue.use(Api);


export default new Router({
  routes: [
    {
      path: '/lessonList',
      name: 'CourseList',
      component: CourseList
    },
    {
      path: '/NewCourse',
      name: 'NewCourse',
      component: NewCourse
    },
    {
      path: '/NewCourseBaseInfo',
      name: 'NewCourseBaseInfo',
      component: NewCourseBaseInfo
    },
    {
      path: '/Plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
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
