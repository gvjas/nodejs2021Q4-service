import { FastifyInstance } from 'fastify'

import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  postBoardSchema,
} from './board.service';

/**
 * @remarks
 * fastify plugin for register the Board's events
 * @param fasrify - server's instance 
 */
const boardRouter = async (fastify: FastifyInstance): Promise<void> => {

    /**
   * declares the routes for the Boards for the endpoints REST API
   * @remarks
   * descriptions for all after methods 
   * @param path - url the path after the prefix "/boards"
   * @param opts - options (schema)
   * @param handler - fastify RouteHandlerMethod
   */

  /** GET 
   * @remarks read all Boards in the database */
  fastify.get('/', handlerGetAll);

  /** GET
   * @remarks read one Board in the database */
  fastify.get('/:id', handlerGetItem);

  /** POST 
   * @remarks create Board in the database */
  fastify.post('/', postBoardSchema, handlerPost);

  /** PUT 
   * @remarks update Board in the database */
  fastify.put(`/:id`, postBoardSchema, handlerPut);

  /** DELETE 
   * @remarks remove Board in the database */
  fastify.delete(`/:id`, handlerDelete);
}


export default boardRouter;
