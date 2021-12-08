const { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId } = require('./task.service');

const taskRouter = async (fastify)=> {

  fastify.addHook('onRequest', handlerValidId)

  fastify.get('/', handlerGetAll)

  fastify.get('/:id', handlerGetItem)

  fastify.post('/', handlerPost)

  fastify.put('/:id', handlerPut)

  fastify.delete(`/:id`, handlerDelete)

}


module.exports = taskRouter;
