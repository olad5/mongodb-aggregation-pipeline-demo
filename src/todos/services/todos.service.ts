import { CRUD } from "../../common/interfaces/crud.interface";
import TodosDao from "../daos/todos.dao";
import { CreateTodoDto } from "../dtos/create.todo.dto";
import { PatchTodoDto } from "../dtos/patch.user.dto";
import { TodoDocument } from "../types/UserDocument";

class TodoService implements CRUD<TodoDocument, CreateTodoDto, PatchTodoDto> {
  async create(resource: CreateTodoDto) {
    return TodosDao.addTodo(resource);
  }

  async list(limit: number, page: number) {
    return TodosDao.getTodos(limit, page);
  }

  async readById(todoId: string) {
    return TodosDao.getSingleTodo(todoId);
  }

  async deleteById(todoId: string) {
    return TodosDao.removeTodo(todoId);
  }

  async patchById(todoId: string, resource: PatchTodoDto) {
    return TodosDao.updateTodo(todoId, resource);
  }
}

export default new TodoService();
