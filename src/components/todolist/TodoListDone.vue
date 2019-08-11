<template>
  <div>
    <todo-list-none v-if="doneTodoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in doneTodoList"
        :key="item.id"
        class="animated fadeInLeft"
      >
        <div class="todo-name">
          {{ item.name }}
          <ul class="todo-pomodoro-num">
            <li
              v-for="(num, index) in item.pomodoroNum"
              :key="index"
            />
          </ul>
        </div>
        <p class="todo-date">
          {{ item.date }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoListNone from '@/components/todolist/TodoListNone'

export default {
  name: 'TodoListDone',
  components: {
    TodoListNone
  },
  data () {
    return {}
  },
  computed: {
    doneTodoList () {
      const data = this.$store.state.todoList
      const newData = data.filter((el) => {
        if (el.isCompleted) {
          return el
        }
      })
      return newData.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.todo-date {
  font-size: 20px;
  color: $secondary-color;
}
</style>
