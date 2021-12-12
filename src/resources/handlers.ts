
import { FastifyRequest, FastifyReply } from 'fastify'
import { validate as isUuid } from 'uuid';

import { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES, DEFAULT_HEADERS } from './constants';
import { IidWise } from './Repository';
import Column from './columns/column.model';


export type Obj = {[key: string]: (string | number | null | (Column|undefined)[])}

export type CustomRequest = FastifyRequest<{
  Body: Obj
  Params: { id: string; boardId: string }
}> 

type ResponseMessage = {[key: string]: string}

/**
 * Handler for server response
 * @param res - fastify reply
 * @param code - numeric server response
 * @param message - object for the response code
 * @returns type void
 */
const responseCodeMesssage = <T>(res: FastifyReply, code: number, message: T | ResponseMessage): void => {
  res.status(code)
      .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
      .send(JSON.stringify(message))    
}

/**
 * Treatment and check id for other handlers and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param getById - callback get an item by id and type for T generic
 * @returns promise element type T or void ("bad request" server response)
 */
const handlerId = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => T|void, id: string): 
  Promise<T|void> => {

    if (!isUuid(id)) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
        HTTP_RESPOSE_MESSAGES.NOT_VALID)
    }
    return await getById(id) || responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_RESPOSE_MESSAGES.NOT_FOUND)
}

    
/**
 * GET treatment of all elements from the base and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param getAll - callback get all elements from the base and type for generic T
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetAll = async <T>(req: CustomRequest, res: FastifyReply, 
  getAll: (boardId?: string) => Promise<(T|undefined)[]>): Promise<void> => {
  try {
    const { boardId } : { boardId?: string } = req.params
    const items: (T|undefined)[] = await getAll(boardId)
    res.send(items)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

/**
 * GET treatment of one element by number from the database
 * @param req - fastify request
 * @param res - fastify reply
 * @param getById - callback for get id handler 
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetItem = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => T): 
  Promise<void> => {
  try {
    const { id } : { id: string} = req.params
    const item: T|void = await handlerId(req, res, getById, id)
    res.send(item)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

/**
 * POST handler for creating a new element in the database and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param pushDB - callback append new item in the data base
 * @param toResponse - callback displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPost = async <T>(req: CustomRequest, res: FastifyReply, 
  pushDB: (body:Obj) => Promise<T>, 
  toResponse: (post: T) => (T | ResponseMessage)): 
  Promise<void> => {
  try {
    const { boardId } : { boardId?: string} = req.params
    if (boardId) { req.body.boardId = boardId }
    const post: T = await pushDB({...req.body})
    responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, toResponse(post));
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

/**
 * PUT handler to update the item in the database and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param getById - callback get id for handlerId
 * @param update - callback updates the properties of the item in the database
 * @param toResponse - callback displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPut = async <T extends IidWise>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => Promise<T|void>, 
  update: (body: Obj) => Promise<T|void>, 
  toResponse: (updateItem: T) => (T | ResponseMessage)): Promise<void> => {
  try {
    const { id } : { id: string} = req.params
    await handlerId(req, res, getById, id)
    const updateItem: (T|void) = await update(req.body)
    if (updateItem) {  
      updateItem.id = id; 
      responseCodeMesssage(res, HTTP_STATUS_CODES.OK, toResponse(updateItem)) 
    };
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

/**
 * DELETE element removal handler in the database and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param getById - callback get id for handlerId
 * @param del - callback deleting an item in the database
 * @param callback - callback updates the properties associated with other elements in the database 
 *                    (e.g. sets the id as zero or del board's tasks)
 * @returns promise void ("OK" or "error" server response)
 */
const handlerDelete = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => Promise<T|void>, 
  del: (id: string) => Promise<void>, 
  callback?: (boardId: string) => void): Promise<void> => {
  try {
    const { id } = req.params
    await handlerId(req, res, getById, id)
    if (id && callback) {
        await callback(id)
    }
    await del(id)
    res.status(HTTP_STATUS_CODES.DELETED)
    res.send()
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

/**
 * For hook for all methods - checking board's id and tasks's id 
 * in the database for the board's tasks and server response
 * @param req - fastify request
 * @param res - fastify reply
 * @param getByBoardId - callback for handlerId get id for type generic U 
 * @param getAll - callback get all elements from the base and type for generic T
 * @returns promise void ("bad request" or "error" server response)
 */
const handlerValidId = async <T extends IidWise, U>(req: CustomRequest, res: FastifyReply, 
  getByBoardId: (boardId: string) => Promise<(U|void)>, 
  getAll: (boardId: string) => Promise<(T|undefined)[]>): 
  Promise<void> => {
  try {
    const { boardId, id } = req.params
    await handlerId(req, res, getByBoardId, boardId)
    const tasks: (T|undefined)[] = await getAll(boardId)
    const task: (T|undefined) = await tasks.find((t: T|undefined):boolean|undefined => t && t.id === id)
    if (id && !task) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_RESPOSE_MESSAGES.NOT_FOUND)
    }
  } catch (e) { 
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export default { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId }; 