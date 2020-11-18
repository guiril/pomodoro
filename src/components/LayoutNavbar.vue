<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li
        class="navbar-list__item"
        @click.prevent="changePomodoroViews"
      >
        <router-link
          class="navbar-list__link"
          to="/"
          exact
        >
          <img
            class="navbar-list__img"
            src="../assets/images/nav_timer.svg"
            alt=""
          >
        </router-link>
      </li>
      <li class="navbar-list__item">
        <router-link
          class="navbar-list__link"
          to="/todo-list"
        >
          <img
            class="navbar-list__img"
            src="../assets/images/nav_list.svg"
            alt=""
          >
        </router-link>
      </li>
      <li class="navbar-list__item">
        <router-link
          class="navbar-list__link"
          to="/analytics"
        >
          <img
            class="navbar-list__img"
            src="../assets/images/nav_analytics.svg"
            alt=""
          >
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    changePomodoroViews () {
      this.$store.dispatch('changePomodoroViews', 'PomodoroInit')
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  float: right;
}

.navbar-list {
  display: flex;
  justify-content: flex-start;
  &__item {
    margin-right: 20px;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
    position: relative;
    display: block;
    width: 80px;
    height: 110px;
    line-height: 110px;
    transition: all .2s;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 0;
      background-color: $primary-dark-color;
      transition: all .3s ease-in;
    }
    &:hover,
    &.router-link-active {
      &:after {
        bottom: 0;
        height: 100%;
      }
    }
  }
  &__img {
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 23px;
  }
}
</style>
