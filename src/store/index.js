import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timerViews: 'Pomodoro',
    pomodoroViews: 'PomodoroInit',
    currentTask: {
      title: '“Unknown task”',
      id: null,
      date: null,
      pomodoroNum: null
    },
    todoList: []
  },
  getters: {
    todoListProcessing: (state) => {
      // 進行中的任務
      let ary = []
      state.todoList.forEach((el) => {
        if (!el.isCompleted) {
          ary.unshift(el)
        }
      })
      return ary
    },
    todoListDone: (state) => {
      // 已完成的任務
      let ary = []
      state.todoList.forEach((el) => {
        if (el.isCompleted) {
          ary.unshift(el)
        }
      })
      return ary
    }
  },
  mutations: {
    changeTimerViews (state, view) {
      // 'Pomodoro' or 'Short Break'
      state.timerViews = view
    },
    changePomodoroViews (state, view) {
      // 'PomodoroInit', 'PomodoroCount', 'PomodoroStop'
      state.pomodoroViews = view
    },
    addNewTodo (state, todo) {
      state.todoList.push(todo) // 新增任務至 todoList 陣列
    },
    removedTask (state, todo) {
      // 找出 todo 在 todoList 的索引值
      const index = state.todoList.findIndex((el) => {
        return el === todo
      })
      state.todoList.splice(index, 1) // 從 todoList 刪除任務
    },
    doTask (state, todo) {
      state.currentTask = todo
    },
    addPomodoroNum (state) {
      if (state.currentTask === '“Unknown task”') {
        return
      }
      state.todoList.forEach((el) => {
        if (state.currentTask === el.name) {
          el.pomodoroNum = el.pomodoroNum + 1
        }
      })
    },
    completeTask (state, todo) {
      // 改變 isCompleted 的值
      state.todoList.forEach((el) => {
        if (todo.id === el.id) {
          el.isCompleted = true
        }
      })
    }
  },
  actions: {
    changeTimerViews ({ commit }, view) {
      commit('changeTimerViews', view)
    },
    changePomodoroViews ({ commit }, view) {
      commit('changePomodoroViews', view)
    },
    addNewTodo ({ commit }, todo) {
      commit('addNewTodo', todo)
    },
    removedTask ({ commit }, todo) {
      commit('removedTask', todo)
    },
    doTask ({ commit }, todo) {
      commit('doTask', todo)
      commit('changePomodoroViews', 'PomodoroCount')
    },
    addPomodoroNum ({ commit }) {
      commit('addPomodoroNum')
    },
    completeTask ({ commit }, todo) {
      commit('completeTask', todo)
    }
  }
})
