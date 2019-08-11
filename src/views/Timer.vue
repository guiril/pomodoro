<template>
  <div>
    <header class="header">
      <timer-ringtone />
      <layout-navbar />
    </header>
    <main class="content__timer">
      <ul class="timer-menu">
        <li>
          <a
            href="#"
            :class="{ 'active': currentViews === 'Pomodoro' }"
            @click.prevent="controlViews('Pomodoro')"
          >Pomodoro</a>
        </li>
        <li>
          <a
            href="#"
            :class="{ 'active': currentViews === 'Short Break' }"
            @click.prevent="controlViews('Short Break')"
          >Short Break</a>
        </li>
      </ul>
      <div v-if="currentViews === 'Pomodoro'">
        <timer-ready
          v-if="!isClockVisible"
          :class="{
            'animated': !isClockVisible,
            'fadeIn': !isClockVisible
          }"
        />
        <timer-countdown
          v-if="isClockVisible"
          :class="{
            'animated': isClockVisible,
            'fadeIn': isClockVisible
          }"
        />
      </div>
      <timer-short-break
        v-if="currentViews === 'Short Break'"
        :class="{
          'animated': currentViews === 'Short Break',
          'fadeIn': currentViews === 'Short Break'
        }"
      />
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
import TimerRingtone from '@/components/timer/TimerRingtone'
import TimerReady from '@/components/timer/TimerReady'
import TimerCountdown from '@/components/timer/TimerCountdown'
import TimerShortBreak from '@/components/timer/TimerShortBreak'

export default {
  name: 'Home',
  components: {
    TimerRingtone,
    LayoutNavbar,
    TimerReady,
    TimerCountdown,
    TimerShortBreak
  },
  data () {
    return {
    }
  },
  computed: {
    currentViews () {
      return this.$store.state.timerViews
    },
    isClockVisible () {
      return this.$store.state.isClockVisible
    }
  },
  methods: {
    controlViews (views) {
      this.$store.dispatch('changeTimerViews', views)
    },
    controlClockVisible () {
      this.$store.dispatch('controlClockVisible', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.content__timer {
  margin-top: 68px;
}

.timer-menu {
  display: flex;
  justify-content: flex-start;
  margin-left: 155px;
  li {
    width: 122px;
    margin-right: 66px;
    &:last-child {
      margin-right: 0;
    }
    a {
      position: relative;
      display: block;
      padding: 9px 4px;
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
</style>
