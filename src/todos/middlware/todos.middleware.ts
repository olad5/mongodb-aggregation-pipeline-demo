import debug from "debug";
import { Response, Request, NextFunction } from "express";

const log: debug.IDebugger = debug("app:todos-middleware");

class TodosMiddleware {
  async extractTodoId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.todoId;
    next();
  }
}

export default new TodosMiddleware();
