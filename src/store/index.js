import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timerViews: 'Pomodoro',
    currentTask: '“Unknown task”',
    isAudioOn: true,
    isPlayAudio: false,
    todoList: [
      {
        name: '吃飯',
        id: 'jkloi',
        date: '2019-08-02',
        pomodoroNum: 3,
        isCompleted: true
      },
      {
        name: '睡覺',
        id: 'rtyuj',
        date: '2019-08-02',
        pomodoroNum: 2,
        isCompleted: true
      },
      {
        name: '打東東',
        id: 'nmkjh',
        date: '2019-08-02',
        pomodoroNum: 1,
        isCompleted: true
      },
      {
        name: '吃飯',
        id: 'gfere',
        date: '2019-08-02',
        pomodoroNum: 4,
        isCompleted: false
      },
      {
        name: '睡覺',
        id: 'reretg',
        date: '2019-08-02',
        pomodoroNum: 3,
        isCompleted: false
      },
      {
        name: '打東東',
        id: 'rhghy',
        date: '2019-08-02',
        pomodoroNum: 2,
        isCompleted: false
      }
    ]
  },
  mutations: {
    changeTimerViews (state, view) {
      state.timerViews = view
    },
    CONTROLAUDIOSWITCH (state, status) {
      state.isAudioOn = !state.isAudioOn
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
    },
    addPomodoroNum (state, status) {
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
    changeTimerViews (context, view) {
      context.commit('changeTimerViews', view)
    },
    controlAudioSwitch (context, status) {
      context.commit('CONTROLAUDIOSWITCH', status)
    },
    addNewTodo (context, status) {
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
      context.commit('addPomodoroNum', status)
    }
  }
})
