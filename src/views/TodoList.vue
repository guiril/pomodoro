<template>
  <div>
    <header class="header">
      <layout-navbar />
    </header>
    <main>
      <h2 class="title">
        Todo list
      </h2>
      <div class="container">
        <div class="list">
          <ul class="todo-nav">
            <li class="todo-nav__item">
              <a
                href="#"
                class="todo-nav__link"
                :class="{ 'todo-nav__link--active': menu === 'Todo' }"
                @click.prevent="menu = 'Todo'"
              >
                Todo
              </a>
            </li>
            <li class="todo-nav__item">
              <a
                href="#"
                class="todo-nav__link"
                :class="{ 'todo-nav__link--active': menu === 'Done' }"
                @click.prevent="menu = 'Done'"
              >
                Done
              </a>
            </li>
          </ul>
          <todo-list-processing v-if="menu === 'Todo'" />
          <todo-list-done v-if="menu === 'Done'" />
        </div>
        <todo-list-add @changeMenu="changeMenu" />
      </div>
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
import TodoListProcessing from '@/components/todo-list/TodoListProcessing'
import TodoListDone from '@/components/todo-list/TodoListDone'
import TodoListAdd from '@/components/todo-list/TodoListAdd'

export default {
  components: {
    LayoutNavbar,
    TodoListProcessing,
    TodoListDone,
    TodoListAdd
  },
  data () {
    return {
      menu: 'Todo'
    }
  },
  methods: {
    changeMenu (menu) {
      this.menu = menu
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 35px;
}

.container {
  display: flex;
  justify-content: space-between;
}

.list {
  width: 495px;
}

.todo-nav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 47px;
  &__item {
    width: 70px;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
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
    &:hover, &--active {
      font-weight: 700;
      color: $secondary-color;
      &:after {
        width: 100%;
        right: 0;
        left: 0;
      }
    }
  }
}
</style>
