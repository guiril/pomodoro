<template>
  <div>
    <div
      v-if="!isStopCountdown"
      class="timer__countdown"
    >
      <div class="timer__countdown__control">
        <span class="timer__countdown__control__number">
          {{ remainingMinutes }}:{{ remainingSeconds }}
        </span>
        <div class="timer__countdown__control__btn">
          <!-- 倒數計時：開始 -->
          <div v-if="!isCountdown">
            <a
              class="timer__countdown__control__btn--play"
              href="#"
              @click.prevent="startCountdown"
            >
              <span class="btn-play" />
            </a>
          </div>
          <!-- 倒數計時：暫停、停止 -->
          <!-- <div v-if="isCountdown">
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
          </div> -->
        </div>
      </div>
      <!-- 倒數計時：任務名稱 -->
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
    <!-- 倒數計時 -->
    <!-- 停止計時 -->
    <!-- <div
      v-if="isStopCountdown"
      class="timer__cancel"
      :class="{
        'animated': isStopCountdown,
        'fadeIn': isStopCountdown
      }"
    >
      <h2 class="timer__cancel__title">
        Restart?
      </h2>
      <div class="timer__cancel__restart">
        <a href="start-pomodoro.html">
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
          <a href="javascript:void(0)">New pomodoro</a>
        </li>
        <li>
          <router-link to="/todo-list">
            Check Todo list
          </router-link>
        </li>
      </ul>
    </div>
    <div class="timer__done">
      <ul class="timer__done__btn">
        <li>
          <a href="#">Take a short break？</a>
        </li>
        <li>
          <a href="#">Skip Break</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ClockShortBreak',
  data () {
    return {
      currentInterval: null,
      isCountdown: false,
      isStopCountdown: false,
      remainingMinutes: '05',
      remainingSeconds: '00',
      totalSeconds: 150
    }
  }
}
</script>

<style lang="scss" scoped>
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
