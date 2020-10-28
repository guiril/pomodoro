<template>
  <div>
    <todo-list-empty v-if="todoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in todoList"
        :key="item.id"
        class="todo-list__item animated fadeInLeft"
      >
        <div class="todo-list__center">
          <p class="todo-list__txt todo-list__title">
            {{ item.title }}
          </p>
          <ul class="pomodoro-amount">
            <li
              v-for="(num, index) in item.amount"
              :key="index"
              class="pomodoro-amount__item"
            />
          </ul>
        </div>
        <p class="todo-list__txt">
          {{ item.date }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoListEmpty from '@/components/todo-list/TodoListEmpty'

export default {
  name: 'TodoListDone',
  components: {
    TodoListEmpty
  },
  data () {
    return {}
  },
  computed: {
    todoList () {
      return this.$store.state.todoListDone
    },
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
