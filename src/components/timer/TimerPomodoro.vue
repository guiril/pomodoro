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
  data () {
    return {
      pomodoroViews: 'PomodoroInit'
    }
  },
  methods: {
    getPomodoroCount () {
      this.pomodoroViews = 'PomodoroCount'
    },
    getPomodoroStop () {
      this.pomodoroViews = 'PomodoroStop'
    }
  }
}
</script>
