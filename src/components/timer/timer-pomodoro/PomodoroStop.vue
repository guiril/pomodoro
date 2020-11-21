<template>
  <div class="stop-container">
    <h2 class="title">
      Restart?
    </h2>
    <div class="restart timer__cancel__restart">
      <a
        href="#"
        class="restart__link u-inline-block"
        @click.prevent="getCountdownInit"
      >
        <img
          class="restart__img u-inline-block"
          src="@/assets/images/timer_restart.svg"
          alt=""
        >
      </a>
    </div>
    <h3 class="task-title">
      {{ taskTitle }}
    </h3>
    <span class="normal-text">or</span>
    <ul class="action-list">
      <li class="action-list__item">
        <a
          class="action-list__link"
          href="#"
          @click.prevent="newPomodoro"
        >
          New pomodoro
        </a>
      </li>
      <li class="action-list__item">
        <router-link
          class="action-list__link"
          to="/todo-list"
        >
          Check Todo list
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTitle: this.$store.state.currentTask.title
    }
  },
  methods: {
    getCountdownInit () {
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
      this.$store.dispatch('changePomodoroViews', 'PomodoroCount')
    },
    newPomodoro () {
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
      this.$store.dispatch('changePomodoroViews', 'PomodoroInit')
    }
  }
}
</script>

<style lang="scss" scoped>
.stop-container {
  margin-top: 92px;
  color: $secondary-color;
  text-align: center;
}

.title {
  font-size: 32px;
  font-weight: 700;
}

.restart {
  margin-top: 22px;
  &__link {
    &:hover {
      .restart__img {
        transform: scale(1.06);
      }
    }
  }
  &__img {
    transition: all .2s ease-in-out;
  }
}

.task-title {
  margin-top: 24px;
  margin-bottom: 55px;
  font-size: 28px;
}

.normal-text {
  color: $secondary-dark-color;
}

.action-list {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  &__item {
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
    width: 145px;
    position: relative;
    display: block;
    padding-bottom: 4px;
    font-size: 20px;
    color: $secondary-dark-color;
    &:after {
      content: '';
      position: absolute;
      right: 51%;
      bottom: -4px;
      left: 51%;
      width: 0;
      height: 2px;
      background-color: $secondary-dark-color;
      transition: all .3s ease-out;
    }
    &:hover {
      letter-spacing: 0.3px;
      &:after {
        right: 0;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>
