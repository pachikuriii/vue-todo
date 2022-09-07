/* global Vue */
/* eslint-disable no-new */

const STORAGE_KEY = 'vue-todo'
const todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = {
  data () {
    return {
      todos: [],
      editingTodo: '',
      newContent: '',
      editingContent: ''
    }
  },
  methods: {
    add: function () {
      if (!this.newTodoContent.length) {
        return
      }
      this.todos.push({
        id: new Date().getTime(),
        content: this.newTodoContent
      })
      todoStorage.save(this.todos)
      this.newTodoContent = ''
    },
    edit: function (targetTodo) {
      this.editedContent = targetTodo.content
      this.editedTodo = targetTodo
    },
    doneEdit: function (targetTodo) {
      const todo = this.todos.find((todo) => todo.id === targetTodo.id)
      const index = this.todos.indexOf(todo)
      this.todos[index].content = this.editedContent
      todoStorage.save(this.todos)
      this.editedTodo = ''
    },
    remove: function (targetTodo) {
      const todo = this.todos.find((todo) => todo.id === targetTodo.id)
      const index = this.todos.indexOf(todo)
      const result = confirm('本当に削除しますか？')
      if (result) {
        this.todos.splice(index, 1)
      }
      todoStorage.save(this.todos)
    }
  },
  created: function () {
    this.todos = todoStorage.fetch()
  }
}

Vue.createApp(app).mount('#app')
