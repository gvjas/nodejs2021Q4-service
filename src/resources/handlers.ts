
import { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } from './constants';
import { responseCodeMesssage, isUuid } from './utils';


const handlerId = async (req: any, res: any, getById: any, id: any) => {
    if (!isUuid(id)) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
        HTTP_RESPOSE_MESSAGES.NOT_VALID)
    }
    const item = await getById(id);
    if (!item) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_RESPOSE_MESSAGES.NOT_FOUND)
    }
    return item
}

const handlerGetAll = async (req: any, res: any, getAll: any) => {
  try {
    const { boardId } = req.params
    const items = await getAll(boardId)
    res.send(items)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const handlerGetItem = async (req: any, res: any, getById: any) => {
  try {
    const { id } = req.params
    const item = await handlerId(req, res, getById, id)
    res.send(item)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const handlerPost = async (req: any, res: any, pushDB: any, toResponse: any) => {
  try {
    const { boardId } = req.params
    if (boardId) { req.body.boardId = boardId }
    const post = await pushDB(req.body)
    responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, toResponse(post));
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}


const handlerPut = async (req: any, res: any, getById: any, update: any, toResponse: any) => {
  try {
    const { id } = req.params
    const item = await handlerId(req, res, getById, id)
    req.body.id = item.id
    const updateItem = await update(req.body)
    responseCodeMesssage(res, HTTP_STATUS_CODES.OK, toResponse(updateItem));
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }

}


const handlerDelete = async (req: any, res: any, getById: any, del: any, callback: any | undefined) => {
  try {
    const { id } = req.params
    await handlerId(req, res, getById, id)
    if (callback) {
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

const handlerValidId = async (req: any, res: any, getByBoardId: any, getAll: any) => {
  try {
    const { boardId, id } = req.params
    await handlerId(req, res, getByBoardId, boardId)
    const tasks = await getAll(boardId)
    
    const task = await tasks.find((it: any) => it.id === id)
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