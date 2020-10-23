<template>
  <div class="stop-break">
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

<script>
export default {
  data () {
    return {
      taskTitle: this.$store.state.currentTask
    }
  },
  methods: {
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
</style>
