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
        <ul
          v-if="activeMenu === 'Daily'"
          class="analytics-total"
        >
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
        <ul
          v-if="activeMenu === 'Weekly'"
          class="analytics-total"
        >
          <li class="analytics-total__item">
            Pomodoros : <span class="u-font-bold">{{ countWeeklyData.pomodoroNum }}</span>
          </li>
          <li class="analytics-total__item">
            Tasks : <span class="u-font-bold">{{ countWeeklyData.tasksNum }}</span>
          </li>
          <li class="analytics-total__item">
            Completed : <span class="u-font-bold">{{ countWeeklyData.completedNum }}</span>
          </li>
          <li class="analytics-total__item">
            Focus time : <span class="u-font-bold">{{ countWeeklyData.focusTime }}</span> mins
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
      today: {
        year: null,
        month: null,
        date: null,
        day: null
      },
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
      datacollection: null,
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
              min: 0,
              max: 14,
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
    todoList () {
      return this.$store.state.todoList
    },
    countDailyData () {
      return this.countData(this.dailyData)
    },
    countWeeklyData () {
      return this.countData(this.weeklyData)
    },
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
    },
    weeklyFirstDateObj () {
      this.getWeeklyData()
      this.fillWeeklyData()
    }
  },
  created () {
    this.getCurrentDate()
    this.getWeeklyDate()
    this.getDailyData()
    this.getWeeklyData()
    this.fillWeeklyData()
  },
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
      const currentDateObj = new Date()
      this.today.year = currentDateObj.getFullYear()
      this.today.month = currentDateObj.getMonth()
      this.today.date = currentDateObj.getDate()
      this.today.day = currentDateObj.getDay()

      // 修正成今天 00:00
      this.todayDateObj = new Date(this.today.year, this.today.month, this.today.date)
      this.dailyDateObj = new Date(this.today.year, this.today.month, this.today.date)
      this.dailyDate = this.todayDate
    },
    getWeeklyDate () {
      const currentDateObj = new Date(this.today.year, this.today.month, this.today.date)
      let lastDateObj, lastDateYear, lastDateMonth, lastDateDate

      // 計算這週第一天與最後一天的日期，星期日 = 0
      this.weeklyFirstDateObj = new Date(currentDateObj.setDate(this.today.date - this.today.day))

      // 計算這週最後一天的日期，並將時間修正為 23:59:59 再存到 data 裡的變數
      lastDateObj = new Date(currentDateObj.setDate(currentDateObj.getDate() + 6))
      lastDateYear = lastDateObj.getFullYear()
      lastDateMonth = lastDateObj.getMonth()
      lastDateDate = lastDateObj.getDate()
      // console.log(currentDateObj)
      this.weeklyLastDateObj = new Date(lastDateYear, lastDateMonth, lastDateDate, 23, 59, 59)
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
      this.fillWeeklyData()
    },
    getDailyData () {
      const vm = this

      let dailyData = this.todoList.filter((el) => {
        if (el.date === vm.dailyDate) {
          return el
        }
      })

      this.dailyData = dailyData
    },
    getWeeklyData () {
      const vm = this
      this.weeklyData = [] // 清空資料

      // 週間資料
      this.todoList.forEach((el) => {
        if (el.id >= Math.floor(vm.weeklyFirstDateObj / 1000) && el.id <= Math.floor(vm.weeklyLastDateObj / 1000)) {
          vm.weeklyData.push(el)
        }
      })
    },
    countData (dataAry) {
      // 統計每日或每週的資料
      let pomodoroNum = 0
      let completedNum = 0

      let obj = {
        pomodoroNum: 0,
        tasksNum: dataAry.length,
        completedNum: 0,
        focusTime: 0
      }

      dataAry.forEach((el) => {
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
    fillWeeklyData () {
      const dateObj = new Date(this.weeklyFirstDateObj)
      const dailyDataMap = {} // { mm/dd: number }
      const dailyDataNumber = []

      const formate = (obj) => {
        const mm = `0${obj.getMonth() + 1}`.substr(-2)
        const dd = `0${obj.getDate()}`.substr(-2)
        return `${mm}/${dd}`
      }

      // 先在日期陣列與資料放入週日
      const dateAry = [formate(dateObj)] // 放在 labels 的日期
      dailyDataMap[formate(dateObj)] = []

      for (let i = 0; i <= 6; i++) {
        const month = dateObj.getMonth()
        const date = dateObj.getDate()

        if (i <= 5) {
          dateObj.setDate(date + 1) // 週一到週六的日期
          dateAry.push(formate(dateObj)) // 格式化新增到 labels 日期陣列
          dailyDataMap[formate(dateObj)] = [] // 將日期設置成資料 map 的 key
        }

        for (let j = 0; j < this.weeklyData.length; j++) {
          // 將任務 timestamp 轉換成毫秒並傳回 date 物件
          const dataDateObj = new Date(this.weeklyData[j].id * 1000)

          if (month === dataDateObj.getMonth() && date === dataDateObj.getDate()) {
            dailyDataMap[formate(dateObj)].push(this.weeklyData[j])
          }
        }
      }

      for (let item in dailyDataMap) {
        dailyDataNumber.push(dailyDataMap[item].length)
      }

      this.datacollection = {
        labels: dateAry,
        datasets: [{
          label: 'Pomodoros',
          backgroundColor: '#CACEAC',
          data: dailyDataNumber
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
