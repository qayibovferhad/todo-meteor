import { Meteor } from "meteor/meteor";
import { Todos } from "./collection";
Meteor.publish("todos", function () {
  return Todos.find();
});
