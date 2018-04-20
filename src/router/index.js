import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import LessonList from '@/components/LessonList'
import LessonInfo from '@/components/LessonInfo'
import Login from '@/components/Login.vue'
import ExamineLessonInfo from '@/components/ExamineLessonInfo'
import ClassInUserList from '@/components/ClassInUserList'
import WeChatHistoryList from '@/components/WeChatHistoryList'
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
      path: '/lessonInfo/:id',
      name: 'lessonInfo',
      component: LessonInfo
    },
    {
      path: '/examineLessonInfo/:id',
      name: 'examineLessonInfo',
      component: ExamineLessonInfo
    },
    {
      path: '/classInUserList',
      name: 'classInUserList',
      component: ClassInUserList
    },
    {
      path:'/weChatHistoryList',
      name:'WeChatHistoryList',
      component: WeChatHistoryList
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
