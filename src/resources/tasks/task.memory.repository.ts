import Repository from '../Repository';
import Task from './task.model'

const tasksRepo = new Repository<Task>()

export const setUserNull = async (userId: string): Promise<void> => {
    tasksRepo.db.forEach((t: Task | undefined): void => {
    if (t && t.userId === userId)
      t.setUserId(null);
  })
  }

export const delAll = async (boardId: string): Promise<void> => {
  tasksRepo.db = tasksRepo.db.filter((t: Task | undefined):boolean|undefined => t && t.boardId !== boardId);
}

export default tasksRepo;



