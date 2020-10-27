<template>
  <div class="animated fadeIn">
    <component
      :is="pomodoroViews"
      :class="{ 'animated bounceIn': pomodoroViews === 'PomodoroStop' }"
      @getPomodoroCount="getPomodoroCount"
      @stopCountdown="getPomodoroStop"
    />
  </div>
</template>

<script>
import PomodoroInit from '@/components/timer/timer-pomodoro/PomodoroInit'
import PomodoroCount from '@/components/timer/timer-pomodoro/PomodoroCount'
import PomodoroStop from '@/components/timer/timer-pomodoro/PomodoroStop'

export default {
  components: {
    PomodoroInit,
    PomodoroCount,
    PomodoroStop
  },
  computed: {
    pomodoroViews () {
      return this.$store.state.pomodoroViews
    }
  },
  methods: {
    getPomodoroCount () {
      this.$store.dispatch('changePomodoroViews', 'PomodoroCount')
    },
    getPomodoroStop () {
      this.$store.dispatch('changePomodoroViews', 'PomodoroStop')
    }
  }
}
</script>
