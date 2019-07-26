import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isClockVisible: false,
    timerViews: 'Pomodoro',
    currentTask: '“Unknown task”',
    todoList: [
      {
        name: '吃飯',
        id: 'jkloi',
        date: '2019-07-01',
        pomodoroNum: 1,
        isCompleted: false
      },
      {
        name: '睡覺',
        id: 'rtyuj',
        date: '2019-07-02',
        pomodoroNum: 2,
        isCompleted: false
      },
      {
        name: '打東東',
        id: 'nmkjh',
        date: '2019-07-03',
        pomodoroNum: 3,
        isCompleted: false
      }
    ]
  },
  mutations: {
    CHANGETIMERVIEWS (state, status) {
      state.timerViews = status
    },
    CONTROLCLOCKVISIBLE (state, status) {
      state.isClockVisible = status
    },
    ADDTASK (state, status) {
      state.todoList.push(status)
    },
    REMOVETASK (state, status) {
      let key
      state.todoList.forEach((el, index) => {
        if (el.id === status) {
          key = index
        }
      })
      state.todoList.splice(key, 1)
    },
    COMPLETETASK (state, status) {
      state.todoList.forEach((el, index) => {
        if (el.id === status) {
          el.isCompleted = true
        }
      })
    },
    GOTODOTASK (state, status) {
      state.currentTask = status
    },
    NEWPOMODORO (state, status) {
      state.currentTask = '“Unknown task”'
      state.isClockVisible = false
    },
    ADDPOMODORONUM (state, status) {
      if (state.currentTask === '“Unknown task”') {
        return
      }
      state.todoList.forEach((el) => {
        if (state.currentTask === el.name) {
          el.pomodoroNum = el.pomodoroNum + 1
        }
      })
    }
  },
  actions: {
    changeTimerViews (context, status) {
      context.commit('CHANGETIMERVIEWS', status)
    },
    controlClockVisible (context, status) {
      context.commit('CONTROLCLOCKVISIBLE', status)
    },
    addedNewTask (context, status) {
      context.commit('ADDTASK', status)
    },
    removedTask (context, status) {
      context.commit('REMOVETASK', status)
    },
    completeTask (context, status) {
      context.commit('COMPLETETASK', status)
    },
    goToDoTask (context, status) {
      context.commit('GOTODOTASK', status)
    },
    newPomodoro (context, status) {
      context.commit('NEWPOMODORO', status)
    },
    addPomodoroNum (context, status) {
      context.commit('ADDPOMODORONUM', status)
    }
  }
})
