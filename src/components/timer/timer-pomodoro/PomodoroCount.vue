<template>
  <div class="countdown-container">
    <div class="countdown">
      <span class="countdown__number">
        {{ remainingMinutes }}:{{ remainingSeconds }}
      </span>
      <template v-if="!isTimesUp">
        <div class="countdown__control">
          <div
            v-if="!isCountdowning"
            :class="{ 'animated fadeInDown': !isCountdowning }"
          >
            <a
              href="#"
              class="countdown__play u-inline-block"
              @click.prevent="startCountdown"
            >
              <div class="play-icon" />
            </a>
          </div>
          <div
            v-if="isCountdowning"
            :class="{ 'animated fadeIn': isCountdowning }"
          >
            <a
              href="#"
              class="countdown__pause u-inline-block"
              @click.prevent="pauseCountdown"
            >
              <div class="pause-icon u-inline-block" />
              <div class="pause-icon u-inline-block" />
            </a>
            <a
              href="#"
              class="countdown__stop u-inline-block"
              @click.prevent="stopCountdown"
            >
              <div class="stop-icon" />
            </a>
          </div>
        </div>
      </template>
      <template v-if="isTimesUp">
        <div
          :class="{ 'animated fadeIn': isTimesUp }"
          class="done"
        >
          <ul class="action-list">
            <li class="action-list__item">
              <a
                href="#"
                class="action-list__link action-list__link--btn"
                @click.prevent="getShortBreak"
              >
                Take a short break？
              </a>
            </li>
            <li class="action-list__item">
              <a
                href="#"
                class="action-list__link action-list__link--text"
                @click.prevent="restartCountdown"
              >
                Skip Break
              </a>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="task">
      <h2 class="task__title">
        {{ taskTitle }}
      </h2>
      <div
        v-if="!isTimesUp"
        class="icon"
      >
        <span class="icon__item" />
        <span class="icon__item" />
        <span class="icon__item" />
        <span class="icon__item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remainingMinutes: '25',
      remainingSeconds: '00',
      totalSeconds: 1500,
      taskTitle: this.$store.state.currentTask.title,
      currentInterval: null,
      isCountdowning: false,
      isStopCountdowning: false,
      isTimesUp: false
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
    getShortBreak () {
      this.$store.dispatch('changeTimerViews', 'Short Break')
    },
    controlViews (view) {
      this.$store.dispatch('changeTimerViews', view)
    },
    resetNumber () {
      this.remainingMinutes = '25'
      this.remainingSeconds = '00'
      this.totalSeconds = 1500
    },
    startCountdown () {
      const vm = this
      let elapsedSeconds = Number(vm.totalSeconds)

      if (elapsedSeconds === 0) {
        return
      }

      this.isCountdowning = true
      this.currentInterval = setInterval(() => {
        elapsedSeconds = elapsedSeconds - 1
        vm.totalSeconds = elapsedSeconds
        vm.remainingMinutes = `0${Math.floor(elapsedSeconds / 60)}`.substr(-2)
        vm.remainingSeconds = `0${elapsedSeconds % 60}`.substr(-2)
      }, 1000)
    },
    pauseCountdown () {
      this.isCountdowning = false
      clearInterval(this.currentInterval)
    },
    stopCountdown () {
      this.$emit('stopCountdown')
      this.isStopCountdowning = true
      this.pauseCountdown()
      this.resetNumber()
    },
    restartCountdown () {
      this.isTimesUp = false
      this.resetNumber()
    },
    timesUp () {
      this.isTimesUp = true
      this.pauseCountdown()
      this.$store.dispatch('addPomodoroNum')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  width: 185px;
  height: 185px;
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
  &__item {
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

.done {
  margin-top: 60px;
}

.action-list {
  text-align: center;
  &__link {
    &--btn {
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
    &--text {
      position: relative;
      display: inline-block;
      padding-bottom: 10px;
      margin-top: 63px;
      font-size: 20px;
      text-align: center;
      color: $secondary-color;
      border-bottom: 2px solid transparent;
      transition: all .3s ease-out;
      &:after {
        width: 0;
        height: 2px;
        content: '';
        position: absolute;
        right: 51%;
        bottom: -2px;
        left: 51%;
        background-color: $secondary-color;
        transition: all .3s ease-out;
      }
      &:hover {
        letter-spacing: 0.3px;
        &:after {
          width: 100%;
          right: 0%;
          left: 0%;
        }
      }
    }
  }
}
</style>
