<template>
  <div>
    <todo-list-empty v-if="todoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in todoList"
        :key="item.id"
        class="todo-list__item animated fadeInLeft"
      >
        <div class="todo-list__body">
          <p class="todo-list__title">
            {{ item.title }}
          </p>
          <ul class="todo-list-number">
            <li
              v-for="(num, index) in item.amount"
              :key="index"
              class="todo-list-number__item"
            />
          </ul>
        </div>
        <p class="todo-list__date">
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
      return this.$store.getters.todoListDone
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
