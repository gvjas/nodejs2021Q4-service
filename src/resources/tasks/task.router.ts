import { FastifyInstance } from 'fastify'

import {
  handlerGetAll,
  handlerGetItem,
  handlerPost,
  handlerPut,
  handlerDelete,
  handlerValidId,
  postTaskSchema
} from './task.service';


/**
 * @remarks
 * fastify plugin for register the Task's events
 * @param fasrify - server's instance 
 */
const taskRouter = async (fastify: FastifyInstance): Promise<void> => {

  /**
   * @remarks
   * checking board's id and tasks's id for the all after methods
   * @param name - event for handler
   * @param hook - fastify handler
   */
  fastify.addHook('onRequest', handlerValidId)

  /**
   * declares the routes for the Tasks for the endpoints REST API
   * @remarks
   * descriptions for all after methods
   * @param path - url the path after the prefix "/boards/:boardId/tasks"
   * @param opts - options (schema)
   * @param handler - fastify RouteHandlerMethod
   */

  /** GET 
   * @remarks read all Tasks in the database */
  fastify.get('/', handlerGetAll)

  /** GET 
   * @remarks read one Task in the database */
  fastify.get('/:id', handlerGetItem)

  /** POST
   * @remarks create Task in the database */
  fastify.post('/', postTaskSchema, handlerPost)

  /** PUT
   * @remarks update Task in the database */
  fastify.put('/:id', postTaskSchema, handlerPut)

  /** DELETE
   * @remarks remove Task in the database */
  fastify.delete(`/:id`, handlerDelete)

}


export default taskRouter;
