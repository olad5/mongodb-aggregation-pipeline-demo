import debug from "debug";
import { Response, Request, NextFunction } from "express";
import TodosService from "../services/todos.service";

const log: debug.IDebugger = debug("app:todos-middleware");

class TodosMiddleware {
  async validateTodoFields(req: Request, res: Response, next: NextFunction) {
    if (!(req.body.title && req.body.description)) {
      return res
        .status(400)
        .send({ status: false, message: "Fields cannot be left empty" });
    } else {
      next();
    }
  }

  async validateTodoExist(req: Request, res: Response, next: NextFunction) {
    const todo = await TodosService.readById(req.body.id);
    if (!todo) {
      return res
        .status(404)
        .send({ status: false, message: "Todo does not exist" });
    }
    next();
  }
  async extractTodoId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.todoId;
    next();
  }
}

export default new TodosMiddleware();
