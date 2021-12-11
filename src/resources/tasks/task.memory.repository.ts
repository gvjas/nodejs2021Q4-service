import Repository from '../Repository';
import Task from './task.model'

const tasksRepo= new Repository<Task>()

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUserNull' does not exist on type 'Rep... Remove this comment to see the full error message
tasksRepo.setUserNull = async (userId: string): Promise<void> => {
    tasksRepo.db.forEach((t: Task | undefined): void => {
    if (t && t.userId === userId)
      t.setUserId(null);
  })
  }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
tasksRepo.delAll = async (boardId: string): Promise<void> => {
  tasksRepo.db = tasksRepo.db.filter((t: Task | undefined):boolean|undefined => t && t.boardId !== boardId);
}

export default tasksRepo;



