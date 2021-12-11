import { FastifyInstance } from 'fastify'

import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  getItems,
  getItem,
  postItem,
} from './user.service';


const userRouter = async (fastify: FastifyInstance): Promise<void> => {

  fastify.get('/', getItems, handlerGetAll);

  fastify.get('/:id', getItem, handlerGetItem);

  fastify.post('/', postItem,  handlerPost);

  fastify.put(`/:id`, postItem, handlerPut);

  fastify.delete(`/:id`, handlerDelete)
}


export default userRouter;
