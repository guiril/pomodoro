<template>
  <div>
    <div class="todo-none animated fadeIn">
      <h2>Let’s start something fun</h2>
      <img
        src="@/assets/images/todo_fun.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListNone'
}
</script>

<style lang="scss" scoped>
.todo-none {
  margin-top: 133px;
  margin-right: 104px;
  text-align: center;
  h2 {
    margin-bottom: 60px;
    font-size: 32px;
    color: $mute-color;
  }
  img {
    width: 210px;
  }
}
</style>
