/* global Vue */
/* eslint-disable no-new */

const STORAGE_KEY = 'vue-todo'
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  el: '#app',
  data: function () {
    return {
      todos: []
    }
  },
  methods: {
    doAdd: function (value) {
      const comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        editing: false
      })
      todoStorage.save(this.todos)
      comment.value = ''
    },
    doEdit: function (todo) {
      todo.editing = true
    },
    doneEdit: function (todo) {
      todo.editing = false
      todoStorage.save(this.todos)
    },
    doRemove: function (todo) {
      const index = this.todos.indexOf(todo)
      const check = confirm('本当に削除しますか？')
      if (check === true) {
        this.todos.splice(index, 1)
      }
      todoStorage.save(this.todos)
    }
  },
  created: function () {
    this.todos = todoStorage.fetch()
  }
})
