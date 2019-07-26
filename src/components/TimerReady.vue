<template>
  <div>
    <div class="timer__ready">
      <ul class="timer__ready__btn">
        <li>
          <a
            href="#"
            @click.prevent="getReadyClock"
          >Start pomodoro</a>
        </li>
        <li>
          <router-link to="/todo-list">
            Choose task
          </router-link>
        </li>
      </ul>
      <div class="timer__ready__img">
        <img
          src="../assets/images/timer_ready.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockReady',
  data () {
    return {

    }
  },
  methods: {
    getReadyClock () {
      this.$store.dispatch('controlClockVisible', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';

.timer__ready {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 156px;
  &__btn {
    li {
      margin-top: 52px;
      &:first-child {
        margin-top: 0;
      }
      a {
        display: block;
        width: 334px;
        height: 85px;
        line-height: 85px;
        font-size: 24px;
        font-weight: 700;
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
  }
  &__img {
    margin-left: 145px;
    img {
      display: block;
      width: 243px;
    }
  }
}
</style>
