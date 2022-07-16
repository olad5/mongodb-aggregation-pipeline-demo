import debug from "debug";
import { Response, Request, NextFunction } from "express";

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

  async extractTodoId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.todoId;
    next();
  }
}

export default new TodosMiddleware();
