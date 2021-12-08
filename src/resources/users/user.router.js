const { handlerGetAll, handlerGetItem, handlerPost, handlerPut, 
        handlerDelete, getItems, getItem, postItem } = require('./user.service');


const userRouter = async (fastify) => {

  fastify.get('/', getItems, handlerGetAll);

  fastify.get('/:id', getItem, handlerGetItem);

  fastify.post('/', postItem,  handlerPost);

  fastify.put(`/:id`, postItem, handlerPut);

  fastify.delete(`/:id`, handlerDelete)
}


module.exports = userRouter;
