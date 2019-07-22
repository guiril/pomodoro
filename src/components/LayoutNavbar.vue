<template>
  <div>
    <nav class="navbar">
      <ul class="navbar__list">
        <li>
          <router-link
            to="/"
            exact
          >
            <img
              src="../assets/images/nav_timer.svg"
              alt=""
            >
          </router-link>
        </li>
        <li>
          <router-link to="/todo-list">
            <img
              src="../assets/images/nav_list.svg"
              alt=""
            >
          </router-link>
        </li>
        <li>
          <router-link to="/analytics">
            <img
              src="../assets/images/nav_analytics.svg"
              alt=""
            >
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LayoutNavbar'
}
</script>

<style scoped lang="scss">
@import '../assets/scss/helpers/vairables';

.navbar {
  float: right;
  margin-right: 137px;
  &__list {
    display: flex;
    justify-content: flex-start;
    li {
      margin-right: 20px;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }
      a {
        display: block;
        width: 80px;
        height: 110px;
        line-height: 110px;
        transition: all .2s;
        &:hover,
        &.router-link-active {
          background-color: $primary-dark-color;
        }
        img {
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 23px;
        }
      }
    }
  }
}
</style>
