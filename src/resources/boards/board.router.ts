import { FastifyInstance } from 'fastify'

import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  postItem,
} from './board.service';


const boardRouter = async (fastify: FastifyInstance): Promise<void> => {

  fastify.get('/', handlerGetAll);

  fastify.get('/:id', handlerGetItem);

  fastify.post('/', postItem, handlerPost);

  fastify.put(`/:id`, postItem, handlerPut);

  fastify.delete(`/:id`, handlerDelete);
}


export default boardRouter;
