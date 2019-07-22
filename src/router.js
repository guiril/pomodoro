import Vue from 'vue'
import Router from 'vue-router'

import Timer from './views/Timer'
import TodoList from './views/TodoList'
import Analytics from './views/Analytics'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Timer',
      component: Timer
    },
    {
      path: '/todo-list',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
