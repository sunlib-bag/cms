import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import HelloWorld from '@/components/HelloWorld'
import CourseList from '@/components/CourseList'
import NewCourse  from '@/components/NewCourse'
import NewCourseBaseInfo  from '@/components/course/NewCourseBaseInfo.vue'
import Plan from '@/components/course/Plan.vue'



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
    },
    {
      path: '/CourseList',
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
    }
  ]
})
