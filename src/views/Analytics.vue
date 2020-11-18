<template>
  <div>
    <header class="header">
      <layout-navbar />
    </header>
    <div class="u-d-flex u-justify-flex-start u-align-flex-end">
      <h2 class="title">
        Analytics
      </h2>
      <nav class="nav">
        <ul class="nav-list">
          <Menu
            v-for="(item, index) in menuList"
            :key="index"
            :title="item"
            :class="{ 'nav-list__item--active': activeMenu === item }"
            @changeActiveMenu="changeActiveMenu(item)"
          />
        </ul>
      </nav>
    </div>
    <main class="main u-d-flex u-justify-flex-start">
      <div class="analytics-txt">
        <date-btn
          v-if="activeMenu === 'Daily'"
          :date="dailyDate"
          @changeNumber="changeDaysFunc"
        />
        <date-btn
          v-if="activeMenu === 'Weekly'"
          :date="weeklyDate"
          @changeNumber="changeWeekFunc"
        />
        <!-- 任務列表 -->
        <ul class="analytics-total">
          <li class="analytics-total__item">
            Pomodoros : <span class="u-font-bold">{{ countDailyData.pomodoroNum }}</span>
          </li>
          <li class="analytics-total__item">
            Tasks : <span class="u-font-bold">{{ countDailyData.tasksNum }}</span>
          </li>
          <li class="analytics-total__item">
            Completed : <span class="u-font-bold">{{ countDailyData.completedNum }}</span>
          </li>
          <li class="analytics-total__item">
            Focus time : <span class="u-font-bold">{{ countDailyData.focusTime }}</span> mins
          </li>
        </ul>
      </div>
      <div class="analytics-chart">
        <!-- 週圖表 -->
        <chart
          v-if="activeMenu === 'Weekly'"
          :chart-data="datacollection"
          :options="chartOptions"
          :width="chartWidth"
          :height="chartHeight"
          class="animated fadeIn"
        />
        <!-- 日統計 -->
        <ul
          v-if="activeMenu === 'Daily'"
          class="analytics-todo-list animated fadeIn"
        >
          <li
            v-for="item in dailyData"
            :key="item.id"
          >
            <div class="todo-name">
              <p>
                {{ item.title }}
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
              </ul>
            </div>
            <span class="todo-spend-time">
              {{ (item.pomodoroNum) * 25 }} mins
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
import Chart from '@/components/Chart'
import Menu from '@/components/analytics/AnalyticsMenu'
import DateBtn from '@/components/analytics/AnalyticsDateBtn'

export default {
  components: {
    LayoutNavbar,
    Chart,
    Menu,
    DateBtn
  },
  data () {
    return {
      menuList: ['Daily', 'Weekly'],
      activeMenu: 'Daily',
      todayDateObj: null,
      dailyDate: null,
      dailyDateObj: null,
      changeDays: 0,
      weeklyFirstDateObj: null,
      weeklyLastDateObj: null,
      dailyData: [],
      weeklyData: [],
      chartWidth: 545,
      chartHeight: 346,
      datacollection: {
        labels: [],
        datasets: [{
          label: 'Pomodoros',
          backgroundColor: '#CACEAC',
          data: []
        }]
      },
      chartOptions: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false,
              color: '#CACEAC',
              lineWidth: 2,
              drawTicks: false
            },
            ticks: {
              fontColor: '#CACEAC',
              fontSize: 16,
              fontFamily: 'Arimo',
              padding: 14
            }
          }],
          yAxes: [{
            gridLines: {
              color: '#CACEAC',
              drawOnChartArea: false,
              lineWidth: 2,
              drawTicks: false
            },
            ticks: {
              beginAtZero: true,
              fontColor: '#CACEAC',
              fontSize: 16,
              fontFamily: 'Arimo',
              padding: 21
            }
          }]
        }
      }
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
    },
    // countWeeklyData () {
    //   return obj
    // },
    todayDate () {
      return this.formatDate(this.todayDateObj)
    },
    weeklyDate () {
      return `${this.formatDate(this.weeklyFirstDateObj)} ~ ${this.formatDate(this.weeklyLastDateObj)}`
    }
  },
  watch: {
    dailyDate () {
      this.getDailyData()
    }
  },
  mounted () {
    this.getCurrentDate()
    this.getWeeklyDate()
    this.getDailyData()
    this.fillData()
  },
  // created () {

  // },
  methods: {
    changeActiveMenu (item) {
      this.activeMenu = item
    },
    formatDate (dateObj) {
      const year = dateObj.getFullYear()
      const month = `0${dateObj.getMonth() + 1}`.substr(-2) // 月份從 0 開始，前面補零，取最後兩個數字
      const date = `0${dateObj.getDate()}`.substr(-2)

      return `${year}-${month}-${date}`
    },
    getCurrentDate () {
      this.todayDateObj = new Date()
      this.dailyDateObj = new Date()
      this.dailyDate = this.todayDate
    },
    getWeeklyDate () {
      const currentDateObj = new Date()
      const currentDate = currentDateObj.getDate() // 今天日期
      const currentDays = currentDateObj.getDay() // 今天的星期

      // 計算這週第一天與最後一天的日期，星期日 = 0
      this.weeklyFirstDateObj = new Date(currentDateObj.setDate(currentDate - currentDays))
      this.weeklyLastDateObj = new Date(currentDateObj.setDate(currentDate - currentDays + 6))
    },
    changeDaysFunc (btn) {
      let currentDate = this.dailyDateObj.getDate()

      this.changeDays = btn
      this.dailyDateObj = new Date(this.dailyDateObj.setDate(currentDate + this.changeDays))
      this.dailyDate = this.formatDate(this.dailyDateObj)
    },
    changeWeekFunc (btn) {
      if (btn > 0) {
        this.changeDays = 7
      } else {
        this.changeDays = -7
      }

      this.weeklyFirstDateObj = new Date(this.weeklyFirstDateObj.setDate(this.weeklyFirstDateObj.getDate() + this.changeDays))
      this.weeklyLastDateObj = new Date(this.weeklyLastDateObj.setDate(this.weeklyLastDateObj.getDate() + this.changeDays))
      this.fillData()
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
    getWeeklyData () {
      // 過濾週間資料
    },
    fillData () {
      // 避免與原本的物件衝突，另外新增目前的週日物件
      const dateObj = new Date(this.weeklyFirstDateObj)

      const formate = (obj) => {
        const mm = `0${obj.getMonth() + 1}`.substr(-2)
        const dd = `0${obj.getDate()}`.substr(-2)
        return `${mm}/${dd}`
      }

      const dateAry = [formate(dateObj)] // 先在陣列放入週日

      for (let i = 0; i <= 5; i++) {
        dateObj.setDate(dateObj.getDate() + 1)
        dateAry.push(formate(dateObj))
      }

      this.datacollection = {
        labels: dateAry,
        datasets: [{
          label: 'Pomodoros',
          backgroundColor: '#CACEAC',
          data: [7, 5, 6, 6, 6, 6, 7]
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-right: 80px;
}

.nav-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.main {
  margin-top: 57px;
}

.analytics-txt {
  margin-right: 140px;
}

.analytics-chart {
  margin-top: 30px;
}

.analytics-total {
  &__item {
    margin-bottom: 20px;
    font-size: 20px;
    color: $secondary-color;
    &:last-child {
      margin-bottom: 0;
    }
  }
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
