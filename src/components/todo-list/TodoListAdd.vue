<template>
  <div class="todo-container">
    <input
      v-model.trim="todoText"
      class="todo-input u-inline-block"
      type="text"
      name=""
      placeholder="Task…"
      @keyup="checkTodoTextLength"
      @keypress.enter="addNewTodo"
    >
    <button
      class="todo-btn u-inline-block"
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
      todoText: ''
    }
  },
  methods: {
    checkTodoTextLength () {
      const limitLength = 20
      this.todoText = this.todoText.substr(0, limitLength)
    },
    addNewTodo () {
      if (this.todolistStr) {
        const time = new Date()
        const year = time.getFullYear()
        const month = `0${time.getMonth() + 1}`.substr(-2)
        const date = `0${time.getDate()}`.substr(-2)
        const timestamp = Math.floor(time / 1000)
        const todo = {
          title: this.todolistStr,
          id: timestamp,
          date: `${year}-${month}-${date}`,
          pomodoroNum: 0,
          isCompleted: false
        }
        this.$store.dispatch('addNewTodo', todo)
        this.todolistStr = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-add {
  width: 410px;
  margin-top: 80px;
  margin-left: 112px;
  text-align: right;
}

.todo-input {
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

.todo-btn {
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
</style>
