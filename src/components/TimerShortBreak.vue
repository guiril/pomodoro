<template>
  <div>
    <!-- stop break time -->
    <div
      v-if="currentViews === 'stop'"
      :class="{
        'animated': currentViews === 'stop',
        'bounceIn': currentViews === 'stop'
      }"
      class="break__stop"
    >
      <div class="break__stop__title">
        <h3>Ready to work?</h3>
        <h2>{{ taskName }}</h2>
      </div>
      <div class="break__stop__restart">
        <a
          href="#"
          @click.prevent="restartCountdown"
        />
      </div>
      <span>or</span>
      <ul class="break__stop__btn">
        <li>
          <a
            href="#"
            @click.prevent="newPomodoro"
          >new pomodoro</a>
        </li>
        <li>
          <router-link to="/todo-list">
            Check Todo list
          </router-link>
        </li>
      </ul>
    </div>
    <!-- break timer -->
    <div
      v-if="currentViews === 'ready'"
      :class="{
        'animated': currentViews === 'ready',
        'fadeIn': currentViews === 'ready'
      }"
      class="timer__countdown"
    >
      <div class="timer__countdown__control">
        <span class="timer__countdown__control__number">
          {{ remainingMinutes }}:{{ remainingSeconds }}
        </span>
        <div class="timer__countdown__control__btn">
          <!-- timer play button -->
          <div
            v-if="!isCountdown"
            :class="{
              'fadeInDown': !isCountdown,
            }"
            class="animated"
          >
            <a
              class="timer__countdown__control__btn--play"
              href="#"
              @click.prevent="startCountdown"
            >
              <span class="btn-play" />
            </a>
          </div>
          <!-- timer pause & stop button -->
          <div
            v-if="isCountdown"
            :class="{
              'fadeIn': isCountdown
            }"
            class="animated"
          >
            <a
              class="timer__countdown__control__btn--pause"
              href="#"
              @click.prevent="pauseCountdown"
            >
              <span class="btn-pause" />
              <span class="btn-pause" />
            </a>
            <a
              class="timer__countdown__control__btn--stop"
              href="#"
              @click.prevent="stopCountdown"
            >
              <span class="btn-stop" />
            </a>
          </div>
        </div>
      </div>
      <!-- Time to take a break -->
      <div class="timer__countdown__task">
        <h2 class="timer__countdown__task--txt">
          Time to Take a break
        </h2>
        <div class="timer__countdown__task--tree">
          <img
            src="../assets/images/break_tree.svg"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockShortBreak',
  data () {
    return {
      taskName: this.$store.state.currentTask,
      currentInterval: null,
      isCountdown: false,
      currentViews: 'ready',
      remainingMinutes: '05',
      remainingSeconds: '00',
      totalSeconds: 3
    }
  },
  watch: {
    totalSeconds () {
      if (this.totalSeconds === 0) {
        this.stopCountdown()
      }
    }
  },
  methods: {
    startCountdown () {
      const vm = this
      let elapsedSeconds = Number(vm.totalSeconds)

      if (elapsedSeconds === 0) {
        return
      }
      this.isCountdown = true
      vm.currentInterval = setInterval(() => {
        elapsedSeconds = elapsedSeconds - 1
        vm.totalSeconds = elapsedSeconds
        vm.remainingMinutes = `0${Math.floor(elapsedSeconds / 60)}`.substr(-2)
        vm.remainingSeconds = `0${elapsedSeconds % 60}`.substr(-2)
      }, 1000)
    },
    pauseCountdown () {
      this.isCountdown = false
      clearInterval(this.currentInterval)
    },
    stopCountdown () {
      this.isCountdown = false
      this.currentViews = 'stop'
      clearInterval(this.currentInterval)
      this.remainingMinutes = '05'
      this.remainingSeconds = '00'
      this.totalSeconds = 300
    },
    restartCountdown () {
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
    },
    newPomodoro () {
      this.$router.push('/')
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';

.break__stop {
  width: 410px;
  margin: 67px auto 0;
  text-align: center;
  &__title {
    color: $secondary-color;
    text-align: left;
    h3 {
      font-size: 24px;
      font-style: italic;
    }
    h2 {
      margin-top: 31px;
      font-size: 32px;
      font-weight: 700;
    }
  }
  &__restart {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 55px auto 0;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: $secondary-color;
      border-radius: 50%;
      transition: all .2s ease-in-out;
      &:hover {
        transform: scale(1.06);
      }
      &:after {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        content: '';
        display: inline-block;
        border-width: 25px 30px;
        border-style: solid;
        border-color: transparent transparent transparent $primary-color;
        border-radius: 4px;
      }
    }
  }
  span {
    display: inline-block;
    margin-top: 52px;
    font-size: 20px;
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
        width: 145px;
        position: relative;
        display: inline-block;
        padding-bottom: 4px;
        font-size: 20px;
        color: $secondary-dark-color;
        transition: all .3s;
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
  }
}

.timer__countdown__task {
  &--txt {
    z-index: 2;
  }
  &--tree {
    position: absolute;
    bottom: 0;
    z-index: 1;
    img {
      display: block;
    }
  }
}

</style>
