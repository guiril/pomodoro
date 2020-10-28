import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timerViews: 'Pomodoro',
    pomodoroViews: 'PomodoroInit',
    currentTodo: {
      title: '“Unknown task”',
      id: null,
      date: null,
      amount: null
    },
    todoListProcessing: [
      { title: '吃飯', id: 'jkloi', date: '2019-08-02', amount: 3 },
      { title: '睡覺', id: 'gjo4url4', date: '2019-08-02', amount: 2 },
      { title: '打東東', id: 'sd9oio', date: '2019-08-01', amount: 1 }
    ],
    todoListDone: [],
    isAudioOn: true,
    isPlayAudio: false
  },
  getters: {
    reverseTodoListProcessing: state => {
      return state.todoListProcessing.reverse()
    },
    checkTodayTodoList: state => {
      let ifTodayHasUnknown = false
      const time = new Date()
      const year = time.getFullYear()
      const month = `0${time.getMonth() + 1}`.substr(-2)
      const date = `0${time.getDate()}`.substr(-2)

      state.todoListProcessing.forEach((el) => {
        if (el.title === '“Unknown task”' && el.date === `${year}-${month}-${date}`) {
          ifTodayHasUnknown = true
        }
      })
      return ifTodayHasUnknown
    }
  },
  mutations: {
    changeTimerViews (state, view) {
      state.timerViews = view
    },
    changePomodoroViews (state, view) {
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
    }
  },
  actions: {
    changeTimerViews ({ commit }, view) {
      commit('changeTimerViews', view)
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
    }
  }
})
