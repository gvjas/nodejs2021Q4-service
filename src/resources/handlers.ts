
import { FastifyRequest, FastifyReply } from 'fastify'
import { validate as isUuid } from 'uuid';

import { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } from './constants';
import { IidWise } from './Repository';
import Column from './columns/column.model';
import { responseCodeMesssage, ResponseMessage } from '../errorHandler';


/** template for the request's body */
export type Obj = {[key: string]: (string | number | null | (Column|undefined)[])}

export type CustomRequest = FastifyRequest<{
  Body: Obj
  Params: { id: string; boardId: string }
}> 

/**
 * @remarks
 * Treatment and check id for other handlers and server response
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
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
 * @remarks
 * GET treatment of all elements from the base and server response
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
 * @param getAll - callback get all elements from the base and type for generic T
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetAll = async <T>(req: CustomRequest, res: FastifyReply, 
  getAll: (boardId?: string) => Promise<(T|undefined)[]>): Promise<void> => {
    const { boardId } : { boardId?: string } = req.params
    const items: (T|undefined)[] = await getAll(boardId)
    res.send(items)
}

/**
 * @remarks
 * GET treatment of one element by number from the database
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
 * @param getById - callback for get id handler 
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetItem = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => T): 
  Promise<void> => {
    const { id } : { id: string} = req.params
    const item: T|void = await handlerId(req, res, getById, id)
    if (!item) {
      return
    }
    res.send(item)
}

/**
 * @remarks
 * POST handler for creating a new element in the database and server response
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
 * @param pushDB - callback append new item in the data base
 * @param toResponse - callback displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPost = async <T>(req: CustomRequest, res: FastifyReply, 
  pushDB: (body:Obj) => Promise<T>, 
  toResponse: (post: T) => (T | ResponseMessage)): 
  Promise<void> => {
    const { boardId } : { boardId?: string} = req.params
    if (boardId) { req.body.boardId = boardId }
    const post: T = await pushDB({...req.body})
    responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, toResponse(post));
}

/**
 * @remarks
 * PUT handler to update the item in the database and server response
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
 * @param getById - callback get id for handlerId
 * @param update - callback updates the properties of the item in the database
 * @param toResponse - callback displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPut = async <T extends IidWise>(req: CustomRequest, res: FastifyReply, 
  getById: (id: string) => Promise<T|void>, 
  update: (body: Obj) => Promise<T|void>, 
  toResponse: (updateItem: T) => (T | ResponseMessage)): Promise<void> => {
    const { id } : { id: string} = req.params
    await handlerId(req, res, getById, id)
    const updateItem: (T|void) = await update(req.body)
    if (updateItem) {  
      updateItem.id = id; 
      responseCodeMesssage(res, HTTP_STATUS_CODES.OK, toResponse(updateItem)) 
    };
}

/**
 * @remarks
 * DELETE element removal handler in the database and server response
 * @typeParam T - response body
 * @param req - the fastify request object
 * @param res - the fastify reply object
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
    const { id } = req.params
    await handlerId(req, res, getById, id)
    if (id && callback) {
        await callback(id)
    }
    await del(id)
    res.status(HTTP_STATUS_CODES.DELETED)
    res.send()
}

/**
 * @remarks
 * For hook for all methods - checking board's id and tasks's id 
 * in the database for the board's tasks and server response
 * @typeParam T - response body
 * @typeParam U - related intermediate parameter
 * @param req - the fastify request object
 * @param res - the fastify reply object
 * @param getByBoardId - callback for handlerId get id for type generic U 
 * @param getAll - callback get all elements from the base and type for generic T
 * @returns promise void ("bad request" or "error" server response)
 */
const handlerValidId = async <T extends IidWise, U>(req: CustomRequest, res: FastifyReply, 
  getByBoardId: (boardId: string) => Promise<(U|void)>, 
  getAll: (boardId: string) => Promise<(T|undefined)[]>): 
  Promise<void> => {
    const { boardId, id } = req.params
    const board: U|void = await handlerId(req, res, getByBoardId, boardId)
    if (!board) {
      return
    }
    const tasks: (T|undefined)[] = await getAll(boardId)
    const task: (T|undefined) = await tasks.find((t: T|undefined):boolean|undefined => t && t.id === id)
    if (id && !task) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_RESPOSE_MESSAGES.NOT_FOUND)
    }
}

export default { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId }; 