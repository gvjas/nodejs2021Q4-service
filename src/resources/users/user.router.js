const usersService = require('./user.service');


const userRouter = async (fastify) => {

  fastify.get('/', usersService.getItems, usersService.handlerGetAll);

  fastify.get('/:id', usersService.getItem, usersService.handlerGetItem);

  fastify.post('/', usersService.postItem,  usersService.handlerPost);

  fastify.put(`/:id`, usersService.postItem, usersService.handlerPut);

  fastify.delete(`/:id`, usersService.handlerDelete)
}


module.exports = userRouter;
