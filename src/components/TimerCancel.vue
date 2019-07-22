<template>
  <div>
    <div class="timer__cancel">
      <h2 class="timer__cancel__title">
        Restart?
      </h2>
      <div class="timer__cancel__restart">
        <a
          href="start-pomodoro.html"
          @click.prevent="getClockCountdown"
        >
          <img
            src="../assets/images/timer_restart.svg"
            alt=""
          >
        </a>
      </div>
      <h3 class="timer__cancel__subtitle">
        {{ taskName }}
      </h3>
      <span>or</span>
      <ul class="timer__cancel__btn">
        <li>
          <a href="#">New pomodoro</a>
        </li>
        <li>
          <router-link to="/todo-list">
            Check Todo list
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockCancel',
  props: [

  ],
  data () {
    return {
      taskName: '“Unknown task”'
    }
  },
  methods: {
    getClockCountdown () {
      this.$emit('goClockViews')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';
.timer__cancel {
  margin-top: 92px;
  color: $secondary-color;
  text-align: center;
  &__title {
    font-size: 32px;
    font-weight: 700;
  }
  &__restart {
    margin-top: 22px;
    a {
      display: inline-block;
    &:hover {
      img {
        transform: scale(1.06);
      }
    }
      img {
        display: inline-block;
        transition: all .2s ease-in-out;
      }
    }
  }
  &__subtitle {
    margin-top: 24px;
    margin-bottom: 55px;
    font-size: 28px;
  }
  span {
    color: $secondary-dark-color;
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 28px;
    li {
      margin-right: 14px;
      &:last-child {
        margin-right: 0;
      }
      a {
        display: block;
        font-size: 20px;
        color: $secondary-dark-color;
      }
    }
  }
}
</style>
