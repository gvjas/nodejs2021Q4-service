const uuid = require('uuid').v4;

class Task {
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

  setUserId(userId) {
    this.userId = userId
  }

  setBoardId(boardId) {
    this.boardId = boardId
  }



  static toResponse(task) {
    return task;
  }
}

module.exports = Task;
