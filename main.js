const STORAGE_KEY = "todos-vuejs-demo";
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const app = new Vue({
  el: "#app",
  data: {
    todos: [],
  },
  methods: {
    doAdd: function (value) {
      const comment = this.$refs.comment;
      if (!comment.value.length) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        editing: false,
      });
      comment.value = "";
    },
    doEdit: function (todo) {
      todo.editing = true;
    },
    doneEdit: function (todo) {
      todo.editing = false;
    },
    doRemove: function (item) {
      const index = this.todos.indexOf(item);
      const check = confirm("本当に削除しますか？");
      if (check === true) {
        this.todos.splice(index, 1);
      }
    },
  },
  created() {
    this.todos = todoStorage.fetch();
  },
});
