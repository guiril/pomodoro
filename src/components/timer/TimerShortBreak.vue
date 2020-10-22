<template>
  <div>
    <template v-if="currentViews === 'readyBreak'">
      <div
        :class="{ 'animated fadeIn': currentViews === 'readyBreak', }"
        class="countdown-container"
      >
        <div class="countdown">
          <span class="countdown__number">
            {{ remainingMinutes }}:{{ remainingSeconds }}
          </span>
          <div class="countdown__control">
            <div
              v-if="!isCountdowning"
              :class="{ 'animated fadeInDown': !isCountdowning }"
            >
              <a
                class="countdown__play u-inline-block"
                href="#"
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
                class="stop u-inline-block"
                @click.prevent="stopCountdown"
              >
                <div class="stop-icon" />
              </a>
            </div>
          </div>
        </div>
        <div class="task">
          <h2 class="task__title">
            Time to Take a break
          </h2>
          <div class="break-icon">
            <img
              class="break-icon__img"
              src="@/assets/images/break_tree.svg"
              alt=""
            >
          </div>
        </div>
      </div>
    </template>
    <template v-if="currentViews === 'stopBreak'">
      <div
        :class="{ 'animated bounceIn': currentViews === 'stopBreak' }"
        class="stop-break"
      >
        <h2 class="stop-break__title">
          Ready to work?
        </h2>
        <h3 class="stop-break__task">
          {{ taskTitle }}
        </h3>
        <a
          href="#"
          class="stop-break__link u-inline-block"
          @click.prevent="goTask"
        />
        <div class="normal-text">
          or
        </div>
        <ul class="action-list">
          <li class="action-list__item">
            <a
              href="#"
              class="action-list__link u-inline-block"
              @click.prevent="newPomodoro"
            >
              new pomodoro
            </a>
          </li>
          <li class="action-list__item">
            <router-link
              to="/todo-list"
              class="action-list__link u-inline-block"
            >
              Check Todo list
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      taskTitle: this.$store.state.currentTask,
      currentInterval: null,
      isCountdowning: false,
      currentViews: 'readyBreak',
      remainingMinutes: '05',
      remainingSeconds: '00',
      totalSeconds: 5
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
      this.pauseCountdown()
      this.currentViews = 'stopBreak'
      this.remainingMinutes = '05'
      this.remainingSeconds = '00'
      this.totalSeconds = 300
    },
    goTask () {
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
.stop-break {
  width: 410px;
  margin: 67px auto 0;
  text-align: center;
  color: $secondary-color;
  &__title {
    font-size: 24px;
    font-style: italic;
    text-align: left;
  }
  &__task {
    margin-top: 31px;
    font-size: 32px;
    font-weight: 700;
    text-align: left;
  }
  &__link {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 55px auto 0;
    background-color: $secondary-color;
    border-radius: 50%;
    transition: all .2s ease-in-out;
    &:hover {
      transform: scale(1.06);
    }
    &:after {
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 0;
      content: '';
      border-width: 25px 30px;
      border-style: solid;
      border-color: transparent transparent transparent $primary-color;
      border-radius: 4px;
      transform: translateY(-50%);
    }
  }
}

.normal-text {
  margin-top: 52px;
  font-size: 20px;
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
    padding-bottom: 4px;
    font-size: 20px;
    color: $secondary-dark-color;
    transition: all .3s;
    &:after {
      width: 0;
      height: 2px;
      content: '';
      position: absolute;
      right: 51%;
      bottom: -4px;
      left: 51%;
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

.break-icon {
  position: absolute;
  bottom: 0;
  z-index: 1;
  &__img {
    display: block;
  }
}
</style>
