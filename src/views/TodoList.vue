<template>
  <div>
    <header class="header">
      <layout-navbar />
    </header>
    <main class="content__todo">
      <h2 class="todo__title">
        Todo list
      </h2>
      <div class="todo__container">
        <!-- <div class="todo__container__none">
          <h2>Let’s start something fun</h2>
          <img
            src="../assets/images/todo_fun.svg"
            alt=""
          >
        </div> -->
        <div class="todo__container__list">
          <ul class="todo__menu">
            <li>
              <a
                href="#"
                :class="{
                  'active': menu === 'Todo'
                }"
                @click.prevent="menu = 'Todo'"
              >Todo</a>
            </li>
            <li>
              <a
                href="#"
                :class="{
                  'active': menu === 'Done'
                }"
                @click.prevent="menu = 'Done'"
              >Done</a>
            </li>
          </ul>
          <ul
            v-if="menu === 'Todo'"
            class="todo__list"
            :class="{
              'animated': menu === 'Todo',
              'fadeIn': menu === 'Todo'
            }"
          >
            <li
              v-for="item in todoList"
              :key="item.id"
              class="animated fadeInLeft"
            >
              <a
                href="#"
                class="task__done"
                @click.prevent="completeTask(item.id)"
              />
              <div class="task__name">
                <p>{{ item.name }}</p>
                <ul class="task__name--pomodoro">
                  <li
                    v-for="(num, index) in item.pomodoroNum"
                    :key="index"
                  />
                </ul>
              </div>
              <ul class="task__btn">
                <li>
                  <a
                    href="#"
                    @click.prevent="removeTask(item.id)"
                  >
                    <img
                      src="../assets/images/todo_remove.svg"
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
                      src="../assets/images/todo_arrow_up.svg"
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
                      src="../assets/images/todo_arrow_down.svg"
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
                      src="../assets/images/todo_start.svg"
                      alt=""
                    >
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul
            v-if="menu === 'Done'"
            class="todo__list"
          >
            <li
              v-for="item in doneTodoList"
              :key="item.id"
              class="animated fadeInLeft"
            >
              <div class="task__name">
                {{ item.name }}
                <ul class="task__name--pomodoro">
                  <li
                    v-for="(num, index) in item.pomodoroNum"
                    :key="index"
                  />
                </ul>
              </div>
              <p class="task__done__date">
                {{ item.date }}
              </p>
            </li>
          </ul>
        </div>
        <div class="todo__container__add">
          <input
            v-model="addTaskName"
            class="todo__container__add--input"
            type="text"
            name=""
            placeholder="Task…"
            @keyup.enter="addedNewTask"
          >
          <button
            class="todo__container__add--btn"
            @click="addedNewTask"
          >
            Add task
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'

export default {
  name: 'TodoList',
  components: {
    LayoutNavbar
  },
  data () {
    return {
      menu: 'Todo',
      addTaskName: ''
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
      this.$store.dispatch('controlClockVisible', true)
      this.$router.push('/')
    },
    addedNewTask () {
      if (this.addTaskName) {
        const time = new Date()
        const year = time.getFullYear()
        const month = `0${time.getMonth() + 1}`.substr(-2)
        const date = `0${time.getDate()}`.substr(-2)
        const timestamp = Math.floor(time / 1000)
        const data = {
          name: this.addTaskName,
          id: timestamp,
          date: `${year}-${month}-${date}`,
          pomodoroNum: 0,
          isCompleted: false
        }
        this.$store.dispatch('addedNewTask', data)
        this.addTaskName = ''
        this.menu = 'Todo'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';

.todo {
  &__title {
    margin-bottom: 35px;
    font-size: 40px;
    font-weight: 700;
    color: $secondary-color;
  }
  &__container {
    display: flex;
    justify-content: flex-start;
    &__none {
      margin-top: 133px;
      margin-right: 104px;
      text-align: center;
      h2 {
        margin-bottom: 60px;
        font-size: 32px;
        color: $mute-color;
      }
      img {
        width: 210px;
      }
    }
    &__list {
      width: 495px;
    }
    &__add {
      width: 410px;
      margin-left: 112px;
    }
  }
  &__menu {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 47px;
    li {
      width: 70px;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
      a {
        position: relative;
        display: block;
        padding-top: 9px;
        padding-bottom: 9px;
        font-size: 20px;
        text-align: center;
        color: $mute-color;
        transition: all .2s ease-out;
        &:after {
          content: '';
          position: absolute;
          right: 51%;
          bottom: -4px;
          left: 51%;
          width: 0;
          height: 4px;
          background-color: $secondary-color;
          transition: all .3s ease-out;
        }
        &:hover,
        &.active {
          font-weight: 700;
          color: $secondary-color;
          &:after {
            right: 0;
            left: 0;
            width: 100%;
          }
        }
      }
    }
  }
}

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

.todo__list {
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
    .task__done {
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
      &__date {
        font-size: 20px;
        color: $secondary-color;
      }
    }
    .task__name {
      width: 270px;
      margin-right: 80px;
      font-size: 20px;
      color: $secondary-color;
      &--pomodoro {
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
    }
  }
}

.task__btn {
  display: flex;
  justify-content: flex-start;
  li {
    margin-right: 20px;
    a {
      display: block;
      transition: all .3s ease-in;
      &.animated-top:hover {
        img {
          animation: animatedUp .8s ease-in .1s;
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

.todo__container__add {
  margin-top: 80px;
  text-align: right;
  &--input {
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
  &--btn {
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
