import { Request, Response } from "express";
import debug from "debug";
import todosService from "../services/todos.service";

const log: debug.IDebugger = debug("app:todos-controllers");

class TodosController {
  async listTodos(req: Request, res: Response) {
    const { limit = 10, page = 0 } = req.query;
    const todos = await todosService.list(Number(limit), Number(page));
    return res.status(200).send(todos);
  }

  async getSingleTodo(req: Request, res: Response) {
    const todo = await todosService.readById(req.body.id);
    return res.status(200).send(todo);
  }
  async createTodo(req: Request, res: Response) {
    const todoId = await todosService.create(req.body);
    return res.status(201).send({ id: todoId });
  }

  async updateTodo(req: Request, res: Response) {
    await todosService.patchById(req.body.id, req.body);
    return res.status(204).send();
  }

  async deleteTodo(req: Request, res: Response) {
    await todosService.deleteById(req.body.id);
    return res.status(204).send();
  }
}

export default new TodosController();
