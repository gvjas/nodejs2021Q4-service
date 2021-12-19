import { v4 as uuid } from 'uuid';


/**
 * class :: Task
 * @remarks
 * task for the board
 */
class Task {
  /** required Board's id for the Task */
  boardId: string;
  /** required Columns's id for the Task */
  columnId: string | null;
  /** required for the each task */
  description: string;
  /** required different uuid for the each task */
  id: string;
  /** required order for the each task */
  order: number;
  /** required different instance uuid */
  title: string;
  /** Users's id for the Task */
  userId: string | null;

  /**
   * @remarks
   * for the task inicializing properties:
   * @param id - uuid
   * @param title - task's name
   * @param description - task's description
   * @param userId - Users's id for the Task
   * @param boardId - Boards's id for the Task
   * @param columnId - Column's id for the Task
   */
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

  /**
   * @remarks
   * update this user's id
   * @param userId - User's id for the Task
   */
  setUserId(userId: string | null): void {
    this.userId = userId
  }

  /**
   * @remarks
   * update this board's id
   * @param boardId - Board's id for the Task
   */
  setBoardId(boardId: string): void {
    this.boardId = boardId
  }

  /**
   * @remarks
   * displays all properties for the Task
   * @param task - Task's instance 
   * @returns instance Task
   */
  static toResponse(task: Task): Task {
    return task;
  }
}

export default Task;
