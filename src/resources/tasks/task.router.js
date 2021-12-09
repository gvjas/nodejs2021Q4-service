import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  handlerValidId,
} from './task.service.js';

const taskRouter = async (fastify)=> {

  fastify.addHook('onRequest', handlerValidId)

  fastify.get('/', handlerGetAll)

  fastify.get('/:id', handlerGetItem)

  fastify.post('/', handlerPost)

  fastify.put('/:id', handlerPut)

  fastify.delete(`/:id`, handlerDelete)

}


export default taskRouter;
