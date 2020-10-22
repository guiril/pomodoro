<template>
  <div>
    <header class="header">
      <layout-navbar />
    </header>
    <main>
      <h2 class="title">
        Todo list
      </h2>
      <div class="todo-container">
        <div class="todo-container-list">
          <ul class="todo-menu">
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
          <todo-list-processing v-if="menu === 'Todo'" />
          <todo-list-done v-if="menu === 'Done'" />
        </div>
        <todo-list-add />
      </div>
    </main>
  </div>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar'
import TodoListProcessing from '@/components/todolist/TodoListProcessing'
import TodoListDone from '@/components/todolist/TodoListDone'
import TodoListAdd from '@/components/todolist/TodoListAdd'

export default {
  name: 'TodoList',
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
  computed: {
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

<style lang="scss" scoped>
// @import '@/assets/scss/helpers/_variables.scss';

.title {
  margin-bottom: 35px;
}

.todo-menu {
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

.todo-container {
  display: flex;
  justify-content: flex-start;
  &-list {
    width: 495px;
  }
}
</style>
