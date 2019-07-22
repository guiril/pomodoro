<template>
  <div>
    <!-- stop timer -->
    <timer-cancel
      v-if="isStopCountdown"
      :class="{
        'animated': isStopCountdown,
        'fadeIn': isStopCountdown
      }"
      @goClockViews="isStopCountdown = false"
    />
    <!-- timer -->
    <div
      v-if="!isStopCountdown"
      class="timer__countdown"
    >
      <div class="timer__countdown__control">
        <span class="timer__countdown__control__number">
          {{ remainingMinutes }}:{{ remainingSeconds }}
        </span>
        <div
          v-if="!isTimesUp"
          class="timer__countdown__control__btn"
        >
          <!-- timer play button -->
          <div
            v-if="!isCountdown"
            :class="{
              'animated': !isCountdown,
              'fadeIn': !isCountdown
            }"
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
              'animated': isCountdown,
              'fadeIn': !sCountdown
            }"
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
        <!-- timer time's up -->
        <div
          v-if="isTimesUp"
          class="timer__done"
        >
          <ul class="timer__done__btn">
            <li>
              <a
                href="#"
                @click="controlViews('Short Break')"
              >Take a short break？</a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="restartCountdown"
              >Skip Break</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- task name -->
      <div class="timer__countdown__task">
        <h2 class="timer__countdown__task--txt">
          {{ taskName }}
        </h2>
        <div
          v-if="!isTimesUp"
          class="timer__countdown__task--icon"
        >
          <span class="task-icon" />
          <span class="task-icon" />
          <span class="task-icon" />
          <span class="task-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimerCancel from '@/components/TimerCancel'

export default {
  name: 'ClockCountdown',
  components: {
    TimerCancel
  },
  data () {
    return {
      taskName: '“Unknown task”',
      currentInterval: null,
      isCountdown: false,
      isStopCountdown: false,
      isTimesUp: false,
      remainingMinutes: '25',
      remainingSeconds: '00',
      totalSeconds: 1500
    }
  },
  watch: {
    totalSeconds () {
      if (this.totalSeconds === 0) {
        this.timesUp()
      }
    }
  },
  methods: {
    controlViews (views) {
      this.$store.dispatch('changeTimerViews', views)
    },
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
      this.isStopCountdown = true
      clearInterval(this.currentInterval)
      this.remainingMinutes = '25'
      this.remainingSeconds = '00'
      this.totalSeconds = 1500
    },
    restartCountdown () {
      this.isTimesUp = false
      this.remainingMinutes = '25'
      this.remainingSeconds = '00'
      this.totalSeconds = 1500
    },
    timesUp () {
      this.isCountdown = false
      this.isTimesUp = true
      clearInterval(this.currentInterval)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/helpers/vairables';

.timer__countdown {
  display: flex;
  padding-left: 254px;
  margin-top: 68px;
}

.timer__countdown__control {
  min-width: 360px;
  margin-right: 110px;
  &__number {
    font-size: 140px;
    font-weight: 700;
    color: $secondary-color;
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 145px;
    &--pause {
      display: inline-block;
      margin-right: 122px;
      transition: all .3s;
      &:hover {
        transform: scale(1.05);
      }
      .btn-pause {
        display: inline-block;
        width: 16px;
        height: 50px;
        background-color: $secondary-color;
        border-radius: 4px;
        margin-right: 18px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &--stop {
      display: inline-block;
      .btn-stop {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-color: $secondary-color;
        border-radius: 4px;
        transition: all .3s;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    &--play {
      display: inline-block;
      .btn-play {
        display: inline-block;
        border-width: 25px 30px;
        border-style: solid;
        border-color: transparent transparent transparent $secondary-color;
        border-radius: 4px;
      }
    }
  }
}

.timer__countdown__task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &--txt {
    width: 346px;
    height: 106px;
    margin-top: 30px;
    font-size: 32px;
    font-weight: 700;
    line-height: 37px;
    color: $secondary-color;
  }
  &--icon {
    width: 185px;
    height: 185px;
    position: relative;
    margin-top: 82px;
    margin-left: 35px;
    background-color: $primary-color;
    border: 10px solid $mute-color;
    border-radius: 50%;
    &:before {
      content: '';
      width: 92px;
      height: 92px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $mute-color;
      border-radius: 50%;
    }
    .task-icon {
      display: block;
      width: 16px;
      height: 55px;
      position: absolute;
      background-color: $mute-color;
      border-radius: 12px;
      &:nth-child(1) {
        top: -38px;
        left: 50%;
        transform: translateX(-50%);
      }
      &:nth-child(3) {
        bottom: -38px;
        left: 50%;
        transform: translateX(-50%);
      }
      &:nth-child(2) {
        top: 50%;
        left: -18px;
        transform: translateY(-50%) rotate(90deg);
      }
      &:nth-child(4) {
        top: 50%;
        right: -18px;
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }
}

.timer__done {
  margin-top: 60px;
  &__btn {
    li {
      &:first-child {
        a {
          display: block;
          padding-top: 26px;
          padding-bottom: 26px;
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          color: $primary-color;
          background-color: $secondary-color;
          border: 1px solid transparent;
          border-radius: 5px;
          transition: all .3s;
          &:hover {
            color: $secondary-color;
            background-color: $primary-color;
            border: 1px solid $secondary-color;
          }
        }
      }
      &:last-child {
        a {
          display: block;
          margin-top: 63px;
          font-size: 20px;
          text-align: center;
          color: $secondary-color;
          transition: all .2s;
          &:hover {
            letter-spacing: 0.5px;
          }
        }
      }
    }
  }
}
</style>
