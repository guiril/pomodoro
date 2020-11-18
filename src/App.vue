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
    this.createData('攀岩', 1)
    setTimeout(() => {
      this.createData('騎腳踏車', 2)
    }, 1000)
  },
  methods: {
    createData (title, number) {
      const time = new Date()
      const year = time.getFullYear()
      const month = `0${time.getMonth() + 1}`.substr(-2)
      const date = `0${time.getDate()}`.substr(-2)
      const timestamp = Math.floor(time / 1000)

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
