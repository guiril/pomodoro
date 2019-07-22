<template>
  <div>
    <header class="header">
      <item-ringtone />
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
          @goClockViews="controlClockVisible"
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
import ItemRingtone from '@/components/ItemRingtone'
import LayoutNavbar from '@/components/LayoutNavbar'
import TimerReady from '@/components/TimerReady'
import TimerCountdown from '@/components/TimerCountdown'
import TimerShortBreak from '@/components/TimerShortBreak'

export default {
  name: 'Home',
  components: {
    ItemRingtone,
    LayoutNavbar,
    TimerReady,
    TimerCountdown,
    TimerShortBreak
  },
  data () {
    return {
      isClockVisible: false,
      isTimesUp: this.$store.state.isTimesUp
    }
  },
  computed: {
    currentViews () {
      let views = this.$store.state.timerViews
      return views
    }
  },
  methods: {
    controlViews (views) {
      this.$store.dispatch('changeTimerViews', views)
    },
    controlClockVisible () {
      this.isClockVisible = !this.isClockVisible
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';

.content__timer {
  margin-top: 68px;
}

.timer-menu {
  display: flex;
  justify-content: flex-start;
  padding-left: 254px;
  li {
    width: 122px;
    margin-right: 66px;
    &:last-child {
      margin-right: 0;
    }
    a {
      display: block;
      padding: 9px 4px;
      font-size: 20px;
      text-align: center;
      color: $mute-color;
      border-bottom: 4px solid transparent;
      transition: all .2s ease-in-out;
      &:hover,
      &.active {
        font-weight: 700;
        color: $secondary-color;
        border-bottom: 4px solid $secondary-color;
      }
    }
  }
}
</style>
