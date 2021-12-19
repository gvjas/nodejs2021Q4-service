const boardsService = require('./board.service');


const boardRouter = async (fastify)=> {

  fastify.get('/', boardsService.handlerGetAll);

  fastify.get('/:id', boardsService.handlerGetItem);

  fastify.post('/', boardsService.postItem, boardsService.handlerPost);

  fastify.put(`/:id`, boardsService.postItem, boardsService.handlerPut);

  fastify.delete(`/:id`, boardsService.handlerDelete);
}


module.exports = boardRouter;
