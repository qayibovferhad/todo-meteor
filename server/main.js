import { Meteor } from "meteor/meteor";
import "../imports/startup/server/index";
import { Todos } from "../imports/api/todos/collection";
Meteor.startup(() => {
  Todos.allow({
    insert: function (userId, doc) {
      return true;
    },
  });
});
