<template>
  <div :class="{ 'animated fadeIn': pomodoroViews === 'TimerCountdown' }">
    <component
      :is="currentViews"
      :class="{ 'animated bounceIn': currentViews === 'countdownStop' }"
      @stop-countdown="currentViews = 'countdownStop'"
      @get-countdown-init="currentViews = 'countdownInit'"
    />
    <!-- 點擊停止計時，出現是否重新開始的畫面 -->
    <!-- <countdown-stop v-if="isCancelCountdown" /> -->
    <!-- <timer-cancel
      v-if="isCancelCountdown"
      :class="{
        'animated': isCancelCountdown,
        'bounceIn': isCancelCountdown
      }"
      @goClockViews="isCancelCountdown = false"
    /> -->
    <!-- 計時器預設畫面 -->
  </div>
</template>

<script>
import countdownInit from '@/components/timer/timer-countdown/countdownInit'
import countdownStop from '@/components/timer/timer-countdown/countdownStop'

export default {
  components: {
    countdownInit,
    countdownStop
  },
  data () {
    return {
      currentViews: 'countdownInit'
    }
  },
  computed: {
    pomodoroViews () {
      return this.$store.state.pomodoroViews
    }
  },
  methods: {
    test () {
      console.log('k')
    }
  }
}
</script>
