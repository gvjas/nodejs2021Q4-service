import Repository from '../Repository.js';


const tasksRepo= new Repository()

tasksRepo.setUserNull = async (userId) => {
    await tasksRepo.db.forEach((t) => { if (t.userId === userId) t.setUserId(null) } )
  }

tasksRepo.delAll = async (boardId) => {
  tasksRepo.db = await tasksRepo.db.filter( (t) => t.boardId !== boardId);
}

export { tasksRepo };



