
import { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } from './constants.js';
import { responseCodeMesssage, isUuid } from './utils.js';


const handlerId = async (req, res, getById, id) => {
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

const handlerGetAll = async (req, res, getAll) => {
  try {
    const { boardId } = req.params
    const items = await getAll(boardId)
    res.send(items)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const handlerGetItem = async (req, res, getById) => {
  try {
    const { id } = req.params
    const item = await handlerId(req, res, getById, id)
    res.send(item)
  } catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const handlerPost = async (req, res, pushDB, toResponse) => {
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


const handlerPut = async (req, res, getById, update, toResponse) => {
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


const handlerDelete = async (req, res, getById, del, callback='') => {
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

const handlerValidId = async (req, res, getByBoardId, getAll) => {
  try {
    const { boardId, id } = req.params
    await handlerId(req, res, getByBoardId, boardId)
    const tasks = await getAll(boardId)
    
    const task = await tasks.find((it) => it.id === id)
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