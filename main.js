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
      editedTodo: ''
    }
  },
  methods: {
    doAdd: function (value) {
      const comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: new Date().getTime(),
        comment: comment.value
      })
      todoStorage.save(this.todos)
      comment.value = ''
    },
    doEdit: function (selectedTodo) {
      this.editedTodo = selectedTodo
    },
    doneEdit: function (selectedTodo) {
      todoStorage.save(this.todos)
      this.editedTodo = ''
    },
    doRemove: function (selectedTodo) {
      const removeTodo = this.todos.find((todo) => todo.id === selectedTodo.id)
      const index = this.todos.indexOf(removeTodo)
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
