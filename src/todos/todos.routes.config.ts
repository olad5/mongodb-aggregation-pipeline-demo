import express from "express";
import TodosControllers from "./controllers/todos.controllers";
import TodosMiddleware from "./middlware/todos.middleware";

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
    this.app.route("/createTodo").post(TodosControllers.createTodo);

    this.app.route("/todos").get(TodosControllers.listTodos);

    this.app.param(`todoId`, TodosMiddleware.extractTodoId);

    this.app
      .route("/todos/:todoId")
      .get(TodosControllers.getSingleTodo)
      .patch(TodosControllers.updateTodo)
      .delete(TodosControllers.deleteTodo);

    return this.app;
  }
}
