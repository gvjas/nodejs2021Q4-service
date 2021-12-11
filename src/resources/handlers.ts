
import { FastifyRequest, FastifyReply } from 'fastify'
import { validate as isUuid } from 'uuid';

import { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES, DEFAULT_HEADERS } from './constants';
import { IidWise } from './Repository';



export type CustomRequest = FastifyRequest<{
  Body: {[key: string]: (string | number | null | undefined | object)}
  Params: { id?: string; boardId?: string }
}>


const responseCodeMesssage = <T>(res: FastifyReply, code: number, message: T | {[key: string]: (string | object)}): void => {
  res.status(code)
      .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
      .send(JSON.stringify(message))    
}

const handlerId = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id?: string) => T, id?: string): 
  Promise<T|void> => {

    if (!id || !isUuid(id)) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
        HTTP_RESPOSE_MESSAGES.NOT_VALID)
    }
    const item: T|void = await getById(id);
    if (!item) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_RESPOSE_MESSAGES.NOT_FOUND)
    }
    return item
}

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

const handlerGetItem = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id?: string) => T): 
  Promise<void> => {
  try {
    const { id } : { id?: string} = req.params
    const item: T|void = await handlerId(req, res, getById, id)
    res.send(item)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const handlerPost = async <T>(req: CustomRequest, res: FastifyReply, 
  pushDB: (body:{[key: string]: (string | number | null | undefined | object)}) => Promise<T>, 
  toResponse: (post: T) => (T | { [key: string]: (string | object) })): 
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

const handlerPut = async <T extends IidWise>(req: CustomRequest, res: FastifyReply, 
  getById: (id?: string) => Promise<T|void>, 
  update: (body:{[key: string]: (string | number | null | undefined | object)}) => Promise<T|void>, 
  toResponse: (updateItem: T) => (T | { [key: string]: (string | object) })): Promise<void> => {
  try {
    const { id } : { id?: string} = req.params
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

const handlerDelete = async <T>(req: CustomRequest, res: FastifyReply, 
  getById: (id?: string) => Promise<T|void>, 
  del: (id?: string) => Promise<void>, 
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

const handlerValidId = async <T extends IidWise, U>(req: CustomRequest, res: FastifyReply, 
  getByBoardId: (boardId?: string) => U|void, 
  getAll: (boardId?: string) => Promise<(T|undefined)[]>): 
  Promise<void> => {
  try {
    const { boardId, id } = req.params
    await handlerId(req, res, getByBoardId, boardId)
    const tasks = await getAll(boardId)
    const task = await tasks.find((t: T|undefined):boolean|undefined => t && t.id === id)
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