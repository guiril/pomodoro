<template>
  <div
    class="container"
    :class="{ 'animated fadeIn': pomodoroViews === 'TimerReady' }"
  >
    <ul class="timer-btn">
      <li class="timer-btn__item">
        <a
          href="#"
          class="timer-btn__link"
          @click.prevent="getTimerCountdown"
        >
          Start pomodoro
        </a>
      </li>
      <li class="timer-btn__item">
        <router-link
          to="/todo-list"
          class="timer-btn__link"
        >
          Choose task
        </router-link>
      </li>
    </ul>
    <img
      src="@/assets/images/timer_ready.svg"
      alt=""
      class="timer-img"
    >
  </div>
</template>

<script>
export default {
  computed: {
    pomodoroViews () {
      return this.$store.state.pomodoroViews
    }
  },
  methods: {
    getTimerCountdown () {
      this.$store.dispatch('changePomodoroViews', 'TimerCountdown')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 156px;
}

.timer-btn {
  &__item {
    margin-top: 52px;
    &:first-child {
      margin-top: 0;
    }
  }
  &__link {
    width: 334px;
    height: 85px;
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: 85px;
    text-align: center;
    color: $secondary-color;
    border: 2px solid $secondary-color;
    border-radius: 5px;
    transition: all .2s;
    &:hover {
      color: $primary-color;
      background-color: $secondary-color;
    }
  }
}

.timer-img {
  width: 243px;
  display: block;
  margin-left: 145px;
}
</style>
