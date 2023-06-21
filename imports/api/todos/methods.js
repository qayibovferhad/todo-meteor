import { Meteor } from "meteor/meteor";
import { Todos } from "./collection";

Meteor.methods({
  "todos.insert"(todoData) {
    Todos.insert(todoData);
  },
  "todos.remove"(taskId) {
    Todos.remove(taskId);
  },

  "todos.update"(taskId, title) {
    Todos.update(taskId, { $set: { title } });
  },
});
