<template>
  <div>
    <todo-list-none v-if="doneTodoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in doneTodoList"
        :key="item.id"
        class="todo-list__item animated fadeInLeft"
      >
        <div class="todo-list__body">
          <p class="todo-list__title">
            {{ item.title }}
          </p>
          <ul class="todo-list-number">
            <li
              v-for="(num, index) in item.pomodoroNum"
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
import TodoListNone from '@/components/todo-list/TodoListNone'

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
      return this.$store.getters.todoListDone
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
