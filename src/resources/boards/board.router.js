const { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, postItem } = require('./board.service');


const boardRouter = async (fastify)=> {

  fastify.get('/', handlerGetAll);

  fastify.get('/:id', handlerGetItem);

  fastify.post('/', postItem, handlerPost);

  fastify.put(`/:id`, postItem, handlerPut);

  fastify.delete(`/:id`, handlerDelete);
}


module.exports = boardRouter;
