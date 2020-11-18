<template>
  <li class="nav-list__item">
    <a
      href="#"
      class="nav-list__link"
      @click.prevent="changeActiveMenu"
    >
      {{ title }}
    </a>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      default: null,
      type: String
    }
  },
  methods: {
    changeActiveMenu () {
      this.$emit('changeActiveMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list {
  &__item {
    width: 70px;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
    &:hover,
    &--active {
      .nav-list__link {
        font-weight: 700;
        color: $secondary-color;
        &:after {
          right: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
  &__link {
    position: relative;
    display: block;
    padding-top: 9px;
    padding-bottom: 9px;
    font-size: 20px;
    text-align: center;
    color: $mute-color;
    transition: all .2s ease-out;
    &:after {
      content: '';
      position: absolute;
      right: 51%;
      bottom: -4px;
      left: 51%;
      width: 0;
      height: 4px;
      background-color: $secondary-color;
      transition: all .3s ease-out;
    }
  }
}
</style>
