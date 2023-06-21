import "./todos.html";
import { Todos } from "../../../api/todos/collection";
import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";

Template.todos.onCreated(function todoOnCreated() {
  this.subscribe("todos");
});
Template.todos.onCreated(function () {
  this.clickedTodo = new ReactiveVar();
});

Template.todos.helpers({
  getTodos: function () {
    return Todos.find().fetch();
  },
  getClickedTodo: function () {
    return Template.instance().clickedTodo.get();
  },
});

Template.todos.events({
  "submit #addTodo": function (event, template) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let data = {
      _id: Random.id(),
      title,
    };
    Meteor.call("todos.insert", data, (error) => {
      if (error) {
        console.log(error);
      }
    });
    document.getElementById("title").value = "";
  },
  "click .removeTodo": function (event, template) {
    const todoId = this._id;
    Meteor.call("todos.remove", todoId);
  },
  "click .editButton": function (event, template) {
    const editTodo = document.getElementById("editTodo");
    editTodo.className = "d-block";
    template.clickedTodo.set(this);
    console.log(template.clickedTodo);
  },
  "submit #editTodo": function (event, template) {
    event.preventDefault();
    const editTitle = document.getElementById("editTitle").value;
    let clickedInput = template.clickedTodo.get();

    Meteor.call("todos.update", clickedInput._id, editTitle, (error) => {
      console.log(error);
    });
    document.getElementById("editTodo").className = "d-none";
  },
});
