<template>
  <div>
    <header class="header">
      <layout-navbar />
    </header>
    <main class="analytics-wrap">
      <div class="analytics-top">
        <h2 class="analytics-top-title title">
          Analytics
        </h2>
        <ul class="analytics-top-menu">
          <li>
            <a
              href="#"
              :class="{
                'active': menu === 'Daily'
              }"
              @click.prevent="menu = 'Daily'"
            >Daily</a>
          </li>
          <li>
            <a
              href="#"
              :class="{
                'active': menu === 'Weekly'
              }"
              @click.prevent="menu = 'Weekly'"
            >Weekly</a>
          </li>
        </ul>
      </div>
      <div class="analytics-container">
        <div class="analytics-txt">
          <div
            v-if="menu === 'Daily'"
            class="analytics-range"
          >
            <a
              href="#"
              class="analytics-range-btn prev"
              @click.prevent="previousDay"
            />
            <span class="analytics-range-txt">{{ dailyDate }}</span>
            <a
              href="#"
              class="analytics-range-btn next"
              @click.prevent="nextDay"
            />
          </div>
          <div
            v-if="menu === 'Weekly'"
            class="analytics-range"
          >
            <a
              href="#"
              class="analytics-range-btn prev"
              @click.prevent="previousDay"
            />
            <span class="analytics-range-txt">{{ weeklyDate }}</span>
            <a
              href="#"
              class="analytics-range-btn next"
              @click.prevent="nextDay"
            />
          </div>
          <ul class="analytics-statistic">
            <li>Pomodoros : <span>{{ countDailyData.pomodoroNum }}</span></li>
            <li>Tasks : <span>{{ countDailyData.tasksNum }}</span></li>
            <li>Completed : <span>{{ countDailyData.completedNum }}</span></li>
            <li>Focus time : <span>{{ countDailyData.focusTime }} mins</span></li>
          </ul>
        </div>
        <!-- daily todolist start -->
        <div class="analytics-chart">
          <div
            v-if="menu === 'Weekly'"
            class="analytics-todo-chart animated fadeIn"
          >
            <!-- <chart :chart-data="datacollection" /> -->
            <!-- <button @click="fillData()">
              Randomize
            </button> -->
            <!-- <canvas ref="chart" /> -->
          </div>
          <ul
            v-if="menu === 'Daily'"
            class="analytics-todo-list animated fadeIn"
          >
            <li
              v-for="item in dailyData"
              :key="item.id"
            >
              <div class="todo-name">
                <p>
                  {{ item.name }}
                  <img
                    v-if="item.isCompleted"
                    class="todo-completed"
                    src="../assets/images/analy_completed.svg"
                    alt=""
                  >
                </p>
                <ul class="todo-pomodoro">
                  <li
                    v-for="number in item.pomodoroNum"
                    :key="number"
                  />
                  <li />
                </ul>
              </div>
              <span class="todo-spend-time">{{ (item.pomodoroNum + 1) * 25 }} mins</span>
            </li>
          </ul>
        </div>
        <!-- daily todolist end -->
      </div>
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
// import chart from '@/chart.js'
// import Chart from 'chart.js'

export default {
  name: 'Analytics',
  components: {
    LayoutNavbar
    // chart
  },
  data () {
    return {
      menu: 'Daily',
      todayDate: '',
      dailyDate: '',
      weeklyDate: '',
      dailyData: [],
      weeklyData: [],
      datacollection: null
    }
  },
  computed: {
    countDailyData () {
      let pomodoroNum = 0
      let completedNum = 0

      let obj = {
        pomodoroNum: 0,
        tasksNum: this.dailyData.length,
        completedNum: 0,
        focusTime: 0
      }

      this.dailyData.forEach((el) => {
        pomodoroNum += el.pomodoroNum
        if (el.isCompleted) {
          completedNum += 1
        }
      })

      obj.pomodoroNum = pomodoroNum
      obj.completedNum = completedNum
      obj.focusTime = pomodoroNum * 25

      return obj
    }
  },
  mounted () {
    this.fillData()
    // var chart = this.$refs.chart
    // var ctx = chart.getContext('2d')
    // var myChart = new Chart(ctx, { // eslint-disable-line no-unused-vars
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // })
  },
  created () {
    this.getDate()
    this.getDailyData()
    this.getWeeklyDate()
  },
  methods: {
    // fillData () {
    //   this.datacollection = {
    //     labels: [this.getRandomInt(), this.getRandomInt()],
    //     datasets: [
    //       {
    //         label: 'Data One',
    //         backgroundColor: '#f87979',
    //         data: [this.getRandomInt(), this.getRandomInt()]
    //       }, {
    //         label: 'Data One',
    //         backgroundColor: '#f87979',
    //         data: [this.getRandomInt(), this.getRandomInt()]
    //       }
    //     ]
    //   }
    // },
    // getRandomInt () {
    //   return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    // },
    getDate () {
      const currentTime = new Date()
      const year = currentTime.getFullYear()
      const month = `0${currentTime.getMonth() + 1}`.substr(-2)
      const date = `0${currentTime.getDate()}`.substr(-2)

      this.dailyDate = `${year}-${month}-${date}`
      this.todayDate = `${year}-${month}-${date}`
    },
    getWeeklyDate () {
      const currentTime = new Date()
      const date = currentTime.getDate()
      const firstDate = new Date(currentTime.setDate(date - 6))

      let formatFirstDate = {
        year: firstDate.getFullYear(),
        month: `0${firstDate.getMonth() + 1}`.substr(-2),
        date: `0${firstDate.getDate()}`.substr(-2)
      }

      this.weeklyDate = `${formatFirstDate.year}-${formatFirstDate.month}-${formatFirstDate.date} ~ ${this.dailyDate}`
    },
    getDailyData () {
      const vm = this
      const data = this.$store.state.todoList

      let dailyData = data.filter((el) => {
        if (el.date === vm.dailyDate) {
          return el
        }
      })

      this.dailyData = dailyData
    },
    nextDay () {
      // console.log('next date')
    },
    previousDay () {
      // const currentTime = new Date()
      // const date = currentTime.getDate()
      // let i = 0
      // i += 1
      // const firstDate = new Date(currentTime.setDate(date - 1 * i))
      // let formatFirstDate = {
      //   year: firstDate.getFullYear(),
      //   month: `0${firstDate.getMonth() + 1}`.substr(-2),
      //   date: `0${firstDate.getDate()}`.substr(-2)
      // }
      // console.log(formatFirstDate)
      // this.dailyDate = `${formatFirstDate.year}-${formatFirstDate.month}-${formatFirstDate.date}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.analytics-top {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  &-title {
    margin-right: 80px;
  }
}

.analytics-top-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  li {
    width: 70px;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
    a {
      position: relative;
      display: block;
      padding-top: 9px;
      padding-bottom: 9px;
      font-size: 20px;
      text-align: center;
      color: $mute-color;
      transition: all .2s ease-out;
      &:after {
        content: '';
        position: absolute;
        right: 51%;
        bottom: -4px;
        left: 51%;
        width: 0;
        height: 4px;
        background-color: $secondary-color;
        transition: all .3s ease-out;
      }
      &:hover,
      &.active {
        font-weight: 700;
        color: $secondary-color;
        &:after {
          right: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
}

.analytics-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 57px;
}

.analytics-txt {
  margin-right: 140px;
}

.analytics-range {
  width: 325px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 30px;
  border-bottom: 4px solid $secondary-color;
  &-txt {
    margin-right: 15px;
    margin-left: 15px;
    font-size: 20px;
    font-weight: 700;
    color: $secondary-color;
  }
  &-btn {
    display: block;
    width: 15px;
    height: 15px;
    padding-right: 2px;
    padding-left: 2px;
    background-repeat: no-repeat;
    background-position: center center;
    &.prev {
      background-image: url('../assets/images/analy_arrow_left.svg');
    }
    &.next {
      background-image: url('../assets/images/analy_arrow_right.svg');
    }
  }
}

.analytics-statistic {
  li {
    margin-bottom: 20px;
    font-size: 20px;
    color: $secondary-color;
    &:last-child {
      margin-bottom: 0;
    }
    span {
      font-weight: 700;
    }
  }
}

.analytics-chart {
  margin-top: 30px;
}

.analytics-todo-list {
  width: 581px;
  font-size: 20px;
  color: $secondary-color;
  > li {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid $mute-color;
    &:last-child {
      border: none;
    }
    .todo-name {
      img {
        width: 90px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
      }
      .todo-pomodoro {
        display: flex;
        margin-top: 7px;
        li {
          width: 10px;
          height: 10px;
          margin-right: 5px;
          background-color: $secondary-dark-color;
          border-radius: 50%;
        }
      }
    }
  }
}

.analytics-todo-chart {
  width: 496px;
  height: 297px;
  border-left: 2px solid $secondary-color;
  border-bottom: 2px solid $secondary-color;
}
</style>
