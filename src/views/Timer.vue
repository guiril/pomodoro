<template>
  <div>
    <header class="header">
      <!-- <timer-ringtone /> -->
      <layout-navbar />
    </header>
    <main class="main">
      <ul class="timer-nav">
        <li class="timer-nav__item">
          <a
            href="#"
            class="timer-nav__link"
            :class="{ 'timer-nav__link--active': activeItem === 'Pomodoro' }"
            @click.prevent="changeTimerViews('Pomodoro')"
          >
            Pomodoro
          </a>
        </li>
        <li class="timer-nav__item">
          <a
            href="#"
            class="timer-nav__link"
            :class="{ 'timer-nav__link--active': activeItem === 'Short Break' }"
            @click.prevent="changeTimerViews('Short Break')"
          >
            Short Break
          </a>
        </li>
      </ul>
      <timer-pomodoro v-if="activeItem === 'Pomodoro'" />
      <timer-break v-if="activeItem === 'Short Break'" />
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
// import TimerRingtone from '@/components/timer/TimerRingtone'
import TimerPomodoro from '@/components/timer/TimerPomodoro'
import TimerBreak from '@/components/timer/TimerBreak'

export default {
  name: 'Home',
  components: {
    // TimerRingtone,
    LayoutNavbar,
    TimerPomodoro,
    TimerBreak
  },
  computed: {
    activeItem () {
      return this.$store.state.timerViews
    }
  },
  methods: {
    changeTimerViews (view) {
      this.$store.dispatch('changeTimerViews', view)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 68px;
}

.timer-nav {
  display: flex;
  justify-content: flex-start;
  margin-left: 155px;
  &__item {
    width: 122px;
    margin-right: 66px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
    position: relative;
    display: block;
    padding: 9px 4px;
    font-size: 20px;
    text-align: center;
    color: $mute-color;
    transition: all .2s ease-out;
    &:after {
      width: 0;
      height: 4px;
      content: '';
      position: absolute;
      right: 51%;
      bottom: -4px;
      left: 51%;
      background-color: $secondary-color;
      transition: all .3s ease-out;
    }
    &:hover, &--active {
      font-weight: 700;
      color: $secondary-color;
      &:after {
        width: 100%;
        right: 0;
        left: 0;
      }
    }
  }
}
</style>
