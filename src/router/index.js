import Vue from 'vue'
import Router from 'vue-router'
import CommPage from '@/components/CommPage'

import Search from '@/components/Search'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import About from '@/components/About'
import Welcome from '@/components/Welcome'
import UserInfoDetail from '@/components/UserInfoDetail'
import Create from '@/components/Create'
import ContentShow from '@/components/ContentShow'

Vue.use(Router)

const thatRouter = new Router({
  mode: 'hash',//如果使用history方法 服务器需要做特殊配置，直接刷新的时候会报错
  routes: [
/*    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/CommPage',
      name: 'CommPage',
      component: CommPage
    },
    {
      path: '/UserInfoDetail',
      name: 'UserInfoDetail',
      component: UserInfoDetail
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create
    },
    {
      path: '/ContentShow',
      name: 'ContentShow',
      component: ContentShow
    }
  ]
})
// thatRouter.beforeEach((to, from, next) => {
//     console.log(to, from, next,777)
// })

export default thatRouter
