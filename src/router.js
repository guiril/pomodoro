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
  ]
})
