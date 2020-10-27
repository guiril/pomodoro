<template>
  <div class="todo-add">
    <input
      v-model.trim="todolistStr"
      class="todo-add-input"
      type="text"
      name=""
      placeholder="Task…"
      @keyup="checkStrLength"
      @keypress.enter="addNewTodo"
    >
    <button
      class="todo-add-btn"
      @click="addNewTodo"
    >
      Add task
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoListAdd',
  data () {
    return {
      todolistStr: ''
    }
  },
  methods: {
    checkStrLength () {
      const limitLength = 20
      this.todolistStr = this.todolistStr.substr(0, limitLength)
    },
    addNewTodo () {
      if (this.todolistStr) {
        this.$store.dispatch('addNewTodoItem', this.todolistStr)
        this.todolistStr = ''
        // this.menu = 'Todo'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.todo-add {
  width: 410px;
  margin-top: 80px;
  margin-left: 112px;
  text-align: right;
  &-input {
    display: inline-block;
    width: 100%;
    padding: 15px 22px;
    margin-bottom: 32px;
    font-size: 18px;
    font-family: $font-family;
    color: $secondary-color;
    background-color: $primary-color;
    border: 1px solid $secondary-color;
    border-radius: 4px;
    &::placeholder {
      font-size: 18px;
      font-style: italic;
      font-family: $font-family;
      font-style: italic;
      color: $mute-color;
    }
  }
  &-btn {
    display: inline-block;
    padding: 9px 36px;
    font-size: 20px;
    color: $primary-color;
    background-color: $secondary-color;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all .3s;
    &:hover {
      color: $secondary-color;
      background-color: transparent;
      border: 1px solid $secondary-color;
    }
  }
}
</style>
