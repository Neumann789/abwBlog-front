import Vue from 'vue'
import Router from 'vue-router'
import CommPage from '@/components/CommPage'

import Search from '@/components/Search'
import Welcome from '@/components/Welcome'

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
      path: '/CommPage',
      name: 'CommPage',
      component: CommPage
    }
  ]
})
