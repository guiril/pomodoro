<template>
  <div>
    <todo-list-empty v-if="todoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in todoList"
        :key="item.id"
        class="todo-list__item animated fadeInLeft"
      >
        <button
          class="todo-list__btn"
          @click="completeTask(item.id)"
        />
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
        <ul class="todo-actions">
          <li class="todo-actions__item">
            <button
              class="todo-actions__btn todo-actions__btn--del"
              @click.prevent="removeTask(item.id)"
            >
              <img
                class="todo-actions__img"
                src="@/assets/images/todo_remove.svg"
                alt="Remove task"
              >
            </button>
          </li>
          <li class="todo-actions__item">
            <button class="todo-actions__btn todo-actions__btn--up">
              <img
                class="todo-actions__img"
                src="@/assets/images/todo_arrow_up.svg"
                alt="Move up"
              >
            </button>
          </li>
          <li class="todo-actions__item">
            <button class="todo-actions__btn todo-actions__btn--down">
              <img
                class="todo-actions__img"
                src="@/assets/images/todo_arrow_down.svg"
                alt="Move down"
              >
            </button>
          </li>
          <li class="todo-actions__item">
            <button
              class="todo-actions__btn todo-actions__btn--start"
              @click.prevent="startTask(item)"
            >
              <img
                class="todo-actions__img"
                src="@/assets/images/todo_start.svg"
                alt="Start Task"
              >
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoListEmpty from '@/components/todo-list/TodoListEmpty'

export default {
  components: {
    TodoListEmpty
  },
  data () {
    return {

    }
  },
  computed: {
    todoList () {
      // const data =
      // const newData = data.filter((el) => {
      //   if (!el.isCompleted) {
      //     return el
      //   }
      // })
      return this.$store.getters.reverseTodoListProcessing
    }
  },
  methods: {
    completeTask (id) {
      this.$store.dispatch('completeTask', id)
    },
    removeTask (id) {
      this.$store.dispatch('removedTask', id)
    },
    startTask (item) {
      this.$store.dispatch('startTask', item)
      this.$store.dispatch('changePomodoroViews', 'PomodoroCount')
      this.$router.push('/')
    }
  }
}
</script>
