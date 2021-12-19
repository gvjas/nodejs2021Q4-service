const tasksService = require('./task.service');

const taskRouter = async (fastify)=> {

  fastify.addHook('onRequest', tasksService.handlerBoardId)

  fastify.get('/', tasksService.handlerGetAll)

  fastify.get('/:id', tasksService.handlerGetItem)

  fastify.post('/', tasksService.handlerPost)

  fastify.put('/:id', tasksService.handlerPut)

  fastify.delete(`/:id`, tasksService.handlerDelete)

}


module.exports = taskRouter;
