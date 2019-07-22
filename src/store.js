import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timerViews: 'Pomodoro',
    todoList: [
      {
        name: 'Lorem ipsum dolor sit amet',
        date: '2019-07-01',
        isCompleted: true
      },
      {
        name: 'Lorem ipsum dolor sit amet',
        date: '2019-07-01',
        isCompleted: false
      },
      {
        name: '吃飯',
        date: '2019-07-01',
        isCompleted: false
      },
      {
        name: '睡覺',
        date: '2019-07-02',
        isCompleted: true
      },
      {
        name: '打東東',
        date: '2019-07-03',
        isCompleted: false
      }
    ]
  },
  mutations: {
    CHANGETIMERVIEWS (state, status) {
      state.timerViews = status
    }
  },
  actions: {
    changeTimerViews (context, status) {
      context.commit('CHANGETIMERVIEWS', status)
    }
  }
})
