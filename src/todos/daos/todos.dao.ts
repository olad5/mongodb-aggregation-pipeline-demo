import debug from "debug";
import { customAlphabet } from "nanoid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateTodoDto } from "../dtos/create.todo.dto";
import { PatchTodoDto } from "../dtos/patch.user.dto";
import { TodoDocument } from "../types/UserDocument";

const log: debug.IDebugger = debug("app:todos-dao");

class TodosDao {
  Schema = mongooseService.getMongoose().Schema;
  nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

  todoSchema = new this.Schema<TodoDocument>(
    {
      _id: {
        type: String,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

  Todo = mongooseService
    .getMongoose()
    .model<TodoDocument>("Todos", this.todoSchema);

  constructor() {
    log("Created new instance of TodoDao");
  }

  async addTodo(todoFields: CreateTodoDto) {
    const todoId = `todo_${this.nanoid()}`;
    const newTodo = new this.Todo({
      _id: todoId,
      ...todoFields,
    });
    await newTodo.save();
    return todoId;
  }

  async getSingleTodo(todoId: string) {
    return this.Todo.findOne({ _id: todoId }).exec();
  }

  async getTodos(limit = 25, page = 0) {
    return this.Todo.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateTodo(todoId: string, todoFields: PatchTodoDto) {
    const existingTodo = await this.Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: todoFields },
      { new: true }
    ).exec();

    return existingTodo;
  }

  async removeTodo(todoId: string) {
    return await this.Todo.findOneAndDelete({ _id: todoId }).exec();
  }
}

export default new TodosDao();
