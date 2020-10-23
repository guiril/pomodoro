<template>
  <div class="countdown-container">
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

<script>
export default {
  data () {
    return {
      currentInterval: null,
      remainingMinutes: '05',
      remainingSeconds: '00',
      totalSeconds: 5,
      isCountdowning: false
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
      this.$emit('stop-break')
      // this.currentViews = 'stopBreak'
      this.remainingMinutes = '05'
      this.remainingSeconds = '00'
      this.totalSeconds = 300
    }
  }
}
</script>

<style lang="scss" scoped>
.break-icon {
  position: absolute;
  bottom: 0;
  z-index: 1;
  &__img {
    display: block;
  }
}
</style>
