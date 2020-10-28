<template>
  <div class="empty animated fadeIn">
    <h2 class="empty__title">
      Let’s start something fun
    </h2>
    <img
      class="empty__img"
      src="@/assets/images/todo_fun.svg"
      alt=""
    >
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty {
  margin-top: 133px;
  margin-right: 104px;
  text-align: center;
  &__title {
    margin-bottom: 60px;
    font-size: 32px;
    color: $mute-color;
  }
  &__img {
    width: 210px;
  }
}
</style>
