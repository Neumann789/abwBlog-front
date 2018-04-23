import Vue from 'vue'
import Router from 'vue-router'
import CommPage from '@/components/CommPage'

import Search from '@/components/Search'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import About from '@/components/About'
import Welcome from '@/components/Welcome'
import UserInfoDetail from '@/components/UserInfoDetail'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
