<template>
  <div
    id="app"
    class="wrapper"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    this.createData('攀岩', 0, 1)
    setTimeout(() => {
      this.createData('騎腳踏車', 1, 2)
    }, 1000)
  },
  methods: {
    createData (title, day, number) {
      const time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth()
      let date = time.getDate() - day
      let timestamp

      const newTime = new Date(year, month, date)
      month = `0${newTime.getMonth() + 1}`.substr(-2)
      date = `0${time.getDate() - day}`.substr(-2)
      timestamp = Math.floor(newTime / 1000)

      this.$store.dispatch('addNewTodo', {
        title: title,
        id: timestamp,
        date: `${year}-${month}-${date}`,
        pomodoroNum: number,
        isCompleted: false
      })
    }
  }
}
</script>
