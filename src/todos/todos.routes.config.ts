import express from "express";
import TodosControllers from "./controllers/todos.controllers";

export class TodoRoutes {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.name = name;
    this.app = app;
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

  configureRoutes(): express.Application {
    this.app.route("/todos").get(TodosControllers.listTodos);
    this.app.route("/createTodo").get(TodosControllers.createTodo);
    this.app.route("/todos:todoId").get(TodosControllers.getSingleTodo);
    this.app.route("/todos:todoId").patch(TodosControllers.updateTodo);
    this.app.route("/todos:todoId").delete(TodosControllers.deleteTodo);

    return this.app;
  }
}
