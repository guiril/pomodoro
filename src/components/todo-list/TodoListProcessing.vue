<template>
  <div>
    <todo-list-none v-if="todoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in todoList"
        :key="item.id"
        class="todo-list__item animated fadeInLeft"
      >
        <a
          href="#"
          class="todo-list__btn"
          @click.prevent="completeTask(item)"
        />
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
        <ul class="todo-list-action">
          <li class="todo-list-action__item">
            <button
              class="todo-list-action__btn"
              @click.prevent="removeTask(item.id)"
            >
              <img
                src="@/assets/images/todo_remove.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
          <li class="todo-list-action__item">
            <button class="todo-list-action__btn animated-top">
              <img
                src="@/assets/images/todo_arrow_up.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
          <li class="todo-list-action__item">
            <button class="todo-list-action__btn animated-top">
              <img
                src="@/assets/images/todo_arrow_down.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
          <li class="todo-list-action__item">
            <button
              class="todo-list-action__btn"
              @click.prevent="doTask(item)"
            >
              <img
                src="@/assets/images/todo_start.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoListNone from '@/components/todo-list/TodoListNone'

export default {
  name: 'TodoListProcessing',
  components: {
    TodoListNone
  },
  data () {
    return {

    }
  },
  computed: {
    todoList () {
      return this.$store.getters.todoListProcessing
    }
  },
  methods: {
    removeTask (item) {
      this.$store.dispatch('removedTask', item)
    },
    completeTask (todo) {
      this.$store.dispatch('completeTask', todo)
    },
    doTask (item) {
      this.$store.dispatch('doTask', item)
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">

</style>
