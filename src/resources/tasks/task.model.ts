import { v4 as uuid } from 'uuid';

class Task {
  boardId: string;

  columnId: string | null;

  description: string;

  id: string;

  order: number;

  title: string;

  userId: string | null;

  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0, 
    description = 'description', 
    userId = null,  // assignee
    boardId = 'boardId', 
    columnId = null
  } = {}) {
    this.id = id
    this.title = title
    this.order = order
    this.description = description 
    this.userId = userId  // 
    this.boardId = boardId 
    this.columnId = columnId
  }

  setUserId(userId: string | null): void {
    this.userId = userId
  }

  setBoardId(boardId: string): void {
    this.boardId = boardId
  }



  static toResponse(task: Task): Task {
    return task;
  }
}

export default Task;
