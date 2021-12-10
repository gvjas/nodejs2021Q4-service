import { v4 as uuid } from 'uuid';

class Task {
  boardId: any;

  columnId: any;

  description: any;

  id: any;

  order: any;

  title: any;

  userId: any;

  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0, 
    description = 'description', 
    userId = null,  // assignee
    boardId = '', 
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

  setUserId(userId: any) {
    this.userId = userId
  }

  setBoardId(boardId: any) {
    this.boardId = boardId
  }



  static toResponse(task: any) {
    return task;
  }
}

export default Task;
