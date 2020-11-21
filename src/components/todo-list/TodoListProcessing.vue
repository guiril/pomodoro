<template>
  <div>
    <todo-list-empty v-if="todoList.length === 0" />
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
              v-for="(num, index) in item.amount"
              :key="index"
              class="todo-list-number__item"
            />
          </ul>
        </div>
        <ul class="todo-list-action">
          <li class="todo-list-action__item">
            <button
              class="todo-list-action__btn"
              @click.prevent="removedTask(item)"
            >
              <img
                src="@/assets/images/todo_remove.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
          <li class="todo-list-action__item">
            <button
              class="todo-list-action__btn animated-top"
              @click="moveUp(item)"
            >
              <img
                src="@/assets/images/todo_arrow_up.svg"
                alt=""
                class="todo-list-action__icon"
              >
            </button>
          </li>
          <li class="todo-list-action__item">
            <button
              class="todo-list-action__btn animated-top"
              @click="moveDown(item)"
            >
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
import TodoListEmpty from '@/components/todo-list/TodoListEmpty'

export default {
  components: {
    TodoListEmpty
  },
  data () {
    return {
      todoList: []
    }
  },
  computed: {
    todoListProcessing () {
      return this.$store.getters.todoListProcessing
    }
  },
  watch: {
    todoListProcessing () {
      this.filterTodos()
    }
  },
  created () {
    this.filterTodos()
  },
  methods: {
    filterTodos () {
      const vm = this
      const allTodos = this.$store.state.todoList
      this.todoList = []
      // 進行中的任務
      allTodos.forEach((el) => {
        if (!el.isCompleted) {
          vm.todoList.unshift(el)
        }
      })
    },
    completeTask (todo) {
      this.$store.dispatch('completeTask', todo)
    },
    removedTask (todo) {
      this.$store.dispatch('removedTask', todo)
    },
    doTask (todo) {
      this.$store.dispatch('doTask', todo)
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
      this.$router.push('/')
    },
    moveDown (todo) {
      const todos = [...this.todoList]
      const lastIndex = this.todoList.length - 1
      const index = this.todoList.findIndex((el) => el === todo)

      if (index !== lastIndex) {
        [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]]
        this.todoList = todos
      }
    },
    moveUp (todo) {
      const todos = [...this.todoList]
      // const firstIndex = 0
      const index = this.todoList.findIndex((el) => el === todo)

      if (index !== 0) {
        [todos[index - 1], todos[index]] = [todos[index], todos[index - 1]]
        this.todoList = todos
      }
    }
  }
}
</script>
