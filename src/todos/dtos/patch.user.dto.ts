import { CreateTodoDto } from "./create.todo.dto";

export interface PatchTodoDto extends Partial<CreateTodoDto> {}
