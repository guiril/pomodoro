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
@import '@/assets/scss/helpers/_variables.scss';

.navbar {
  float: right;
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
