import { FastifyInstance, FastifyPluginAsync } from 'fastify'

import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  getUsersSchema,
  getUserSchema,
  postUserSchema,
} from './user.service';

/**
 * @remarks
 * fastify plugin for register the User's events
 * @param fasrify - server's instance 
 */
const userRouter: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {

  /**
   * declares the routes for the Users for the endpoints REST API
   * @remarks
   * descriptions for all after methods 
   * @param path - url the path after the prefix "/users"
   * @param opts - options (schema)
   * @param handler - fastify RouteHandlerMethod
   */

  /** GET 
   * @remarks read all Users in the database */
  fastify.get('/', getUsersSchema, handlerGetAll);

  /** GET
   * @remarks read one User in the database */
  fastify.get('/:id', getUserSchema, handlerGetItem);

  /** POST 
   * @remarks create User in the database */
  fastify.post('/', postUserSchema,  handlerPost);

  /** PUT 
   * @remarks update User in the database */
  fastify.put(`/:id`, postUserSchema, handlerPut);

  /** DELETE 
   * @remarks remove User in the database */
  fastify.delete(`/:id`, handlerDelete)
}


export default userRouter;
