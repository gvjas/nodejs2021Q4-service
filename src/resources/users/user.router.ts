import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  getItems,
  getItem,
  postItem,
} from './user.service.js';


const userRouter = async (fastify) => {

  fastify.get('/', getItems, handlerGetAll);

  fastify.get('/:id', getItem, handlerGetItem);

  fastify.post('/', postItem,  handlerPost);

  fastify.put(`/:id`, postItem, handlerPut);

  fastify.delete(`/:id`, handlerDelete)
}


export default userRouter;
