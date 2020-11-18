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
    isAudioOn: true,
    isPlayAudio: false,
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
<<<<<<< HEAD
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
=======
      state.pomodoroViews = view
    },
    addNewTodoItem (state, todo) {
      state.todoListProcessing.push(todo)
    },
    addPomodoroAmount (state) {
      state.currentTodo.amount += 1
      state.todoListProcessing.forEach((el) => {

      })
    },
    // addPomodoroNum (state) {
    //   if (state.currentTask === '“Unknown task”') {
    //     return
    //   }
    //   state.todoList.forEach((el) => {
    //     if (state.currentTask === el.name) {
    //       el.pomodoroNum = el.pomodoroNum + 1
    //     }
    //   })
    // },
    completeTask (state, id) {
      state.todoListProcessing.forEach((el, index) => {
        if (el.id === id) {
          state.todoListProcessing.splice(index, 1)
          state.todoListDone.push(el)
        }
      })
    },
    removedTask (state, id) {
      state.todoListProcessing.forEach((el, index) => {
        if (el.id === id) {
          state.todoListProcessing.splice(index, 1)
        }
      })
    },
    startTask (state, item) {
      state.currentTodo = item
    },
    CONTROLAUDIOSWITCH (state, status) {
      state.isAudioOn = !state.isAudioOn
    },
    NEWPOMODORO (state, status) {
      state.currentTask = '“Unknown task”'
>>>>>>> cb12bdbf6a5a2f9898a5b4f5be6e6ff144b1aeb2
    }
  },
  actions: {
    changeTimerViews ({ commit }, view) {
      commit('changeTimerViews', view)
<<<<<<< HEAD
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
      // commit('removedTask', todo)
=======
    },
    changePomodoroViews ({ commit }, view) {
      commit('changePomodoroViews', view)
    },
    addNewTodoItem ({ commit }, title) {
      const time = new Date()
      const year = time.getFullYear()
      const month = `0${time.getMonth() + 1}`.substr(-2)
      const date = `0${time.getDate()}`.substr(-2)
      const timestamp = Math.floor(time / 1000)
      const todo = {
        title: title,
        id: timestamp,
        date: `${year}-${month}-${date}`,
        amount: 0
      }
      commit('addNewTodoItem', todo)

      if (todo.title === '“Unknown task”') {
        commit('startTask', todo)
      }
    },
    addPomodoroAmount ({ commit }) {
      commit('addPomodoroAmount')
    },
    completeTask ({ commit }, id) {
      commit('completeTask', id)
    },
    removedTask ({ commit }, id) {
      commit('removedTask', id)
    },
    startTask ({ commit }, item) {
      commit('startTask', item)
    },
    controlAudioSwitch ({ commit }, status) {
      commit('CONTROLAUDIOSWITCH', status)
    },
    newPomodoro ({ commit }, status) {
      commit('NEWPOMODORO', status)
>>>>>>> cb12bdbf6a5a2f9898a5b4f5be6e6ff144b1aeb2
    }
  }
})
