<template>
  <div>
    <todo-list-none v-if="todoList.length === 0" />
    <ul class="todo-list">
      <li
        v-for="item in todoList"
        :key="item.id"
        class="animated fadeInLeft"
      >
        <a
          href="#"
          class="todo-btn-done"
          @click.prevent="completeTask(item.id)"
        />
        <div class="todo-name">
          <p>{{ item.name }}</p>
          <ul class="todo-pomodoro-num">
            <li
              v-for="(num, index) in item.pomodoroNum"
              :key="index"
            />
          </ul>
        </div>
        <ul class="todo-btn-list">
          <li>
            <a
              href="#"
              @click.prevent="removeTask(item.id)"
            >
              <img
                src="@/assets/images/todo_remove.svg"
                alt=""
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="animated-top"
            >
              <img
                src="@/assets/images/todo_arrow_up.svg"
                alt=""
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="animated-top"
            >
              <img
                src="@/assets/images/todo_arrow_down.svg"
                alt=""
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="goToDoTask(item.name)"
            >
              <img
                src="@/assets/images/todo_start.svg"
                alt=""
              >
            </a>
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
      const data = this.$store.state.todoList
      const newData = data.filter((el) => {
        if (!el.isCompleted) {
          return el
        }
      })
      return newData.reverse()
    }
  },
  methods: {
    removeTask (item) {
      this.$store.dispatch('removedTask', item)
    },
    completeTask (item) {
      this.$store.dispatch('completeTask', item)
    },
    goToDoTask (item) {
      this.$store.dispatch('goToDoTask', item)
      this.$store.dispatch('changeTimerViews', 'Pomodoro')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/helpers/_variables.scss';

@keyframes animatedUp {
  0% {
    transform: translateY(-5px);
  }
  33% {
    transform: translateY(0px);
  }
  66% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes animatedRight {
  0% {
    transform: translateX(5px);
  }
  33% {
    transform: translateX(0px);
  }
  66% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
}

.todo-list {
  > li {
    display: flex;
    justify-content: flex-start;
    padding-top: 14px;
    padding-bottom: 14px;
    align-items: center;
    border-bottom: 1px solid $mute-color;
    &:last-child {
      border-bottom: none;
    }
    .todo-btn-done {
      display: inline-block;
      width: 19px;
      height: 19px;
      margin-right: 15px;
      border-radius: 50%;
      border: 1px solid $secondary-color;
      transition: all .2s;
      &:hover {
        background-color: $secondary-color;
      }
    }
    .todo-name {
      width: 270px;
      margin-right: 80px;
      font-size: 20px;
      color: $secondary-color;
      p {
        word-wrap: break-word;
      }
    }
  }
}

.todo-pomodoro-num {
  display: flex;
  margin-top: 7px;
  li {
    width: 10px;
    height: 10px;
    margin-right: 5px;
    background-color: $secondary-dark-color;
    border-radius: 50%;
  }
}

.todo-btn-list {
  display: flex;
  justify-content: flex-start;
  li {
    margin-right: 20px;
    a {
      display: block;
      img {
        transition: all .3s ease-in;
      }
      &.animated-top:hover {
        img {
          animation: animatedUp .8s ease-in .1s;
        }
      }
    }
    &:first-child {
      a:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
    &:last-child {
      margin-right: 0;
      a:hover {
        img {
          animation: animatedRight .8s ease-in .1s;
        }
      }
    }
  }
}

</style>
