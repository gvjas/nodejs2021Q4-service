import Repository from '../Repository';
import Task from './task.model'

/**
 * @remarks
 * database with CRUD methods for the Task
 */
const tasksRepo = new Repository<Task>()


/**
 * @remarks
 * update property userId as null for the deleted users's for the all tasks
 * @param userId - User's id for this tasks
 * @returns promise set userId = null
 */
export const setUserNull = async (userId: string): Promise<void> => {
    tasksRepo.db.forEach((t: Task | undefined): void => {
    if (t && t.userId === userId)
      t.setUserId(null);
  })
}

/**
 * @remarks
 * delete all tasks for the deleted boards
 * @param boardId - Board's id for this tasks
 * @returns promise update database without deleted tasks
 */
export const delAll = async (boardId: string): Promise<void> => {
  tasksRepo.db = tasksRepo.db.filter((t: Task | undefined):boolean|undefined => t && t.boardId !== boardId);
}

export default tasksRepo;



