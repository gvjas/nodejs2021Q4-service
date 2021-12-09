import Repository from '../Repository.js';


const tasksRepo= new Repository()

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUserNull' does not exist on type 'Rep... Remove this comment to see the full error message
tasksRepo.setUserNull = async (userId: any) => {
    await tasksRepo.db.forEach((t: any) => { if (t.userId === userId) t.setUserId(null) } )
  }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
tasksRepo.delAll = async (boardId: any) => {
  tasksRepo.db = await tasksRepo.db.filter( (t: any) => t.boardId !== boardId);
}

export { tasksRepo };



