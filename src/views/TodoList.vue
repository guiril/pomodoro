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
              v-for="(item, key) in todoList"
              :key="key"
            >
              <a
                href="#"
                class="task__done"
              />
              <p class="task__name">
                {{ item.name }}
              </p>
              <ul class="task__btn">
                <li>
                  <a href="#">
                    <img
                      src="../assets/images/todo_remove.svg"
                      alt=""
                    >
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/images/todo_arrow_up.svg"
                      alt=""
                    >
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/images/todo_arrow_down.svg"
                      alt=""
                    >
                  </a>
                </li>
                <li>
                  <a href="#">
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
            :class="{
              'animated': menu === 'Done',
              'fadeIn': menu === 'Done'
            }"
          >
            <li
              v-for="(item, key) in doneTodoList"
              :key="key"
            >
              <a
                href="#"
                class="task__done"
              />
              <p class="task__name">
                {{ item.name }}
              </p>
              <p class="task__done__date">
                {{ item.date }}
              </p>
            </li>
          </ul>
        </div>
        <div class="todo__container__add">
          <input
            id="addTask"
            class="todo__container__add--input"
            type="text"
            name=""
            placeholder="Task…"
          >
          <button class="todo__container__add--btn">
            Add task
          </button>
        </div>
      </div>
      <!-- <h2>Let’s start something fun</h2>
      <img
        src="../assets/images/todo_fun.svg"
        alt=""
      > -->
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
      menu: 'Todo'
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
      return newData
    },
    doneTodoList () {
      const data = this.$store.state.todoList
      const newData = data.filter((el) => {
        if (el.isCompleted) {
          return el
        }
      })
      return newData
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/vairables';
.content {
  &__todo {
    padding-left: 137px;
  }
}

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
        display: block;
        padding-top: 9px;
        padding-bottom: 9px;
        font-size: 20px;
        text-align: center;
        color: $mute-color;
        border-bottom: 4px solid transparent;
        transition: all .2s ease-in-out;
        &:hover,
        &.active {
          font-weight: 700;
          color: $secondary-color;
          border-bottom: 4px solid $secondary-color;
        }
      }
    }
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
    }
    .task__btn {
      display: flex;
      justify-content: flex-start;
      li {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
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
    border-radius: 4px;
  }
}
</style>
