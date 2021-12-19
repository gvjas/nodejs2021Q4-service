
const { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } = require('./constants');
const { responseCodeMesssage, isUuid } = require('./utils')

const handlerGetAll = async (req, res, getAll) => {
try {
    const {boardId} = req.params
    const items = !boardId ? await getAll() : await getAll(boardId)
    res.send(items)
} catch (e) {
    responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
}
}

const handlerGetItem = async (req, res, getById) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      }
      const item = await getById(id);
      if (!item) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        res.send(item)
      }      
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  }

const handlerPost = async (req, res, pushDB, toResponse) => {
    try {
      const {boardId} = req.params
      const post = boardId ? await pushDB(boardId, req.body) : await pushDB(req.body)
      responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, toResponse(post));
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  }


const handlerPut = async (req, res, getById, update, toResponse) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const itemById = await getById(id);
      if (!itemById) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        const item = { id, ...req.body }
        const updateItem = await update(item)
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, toResponse(updateItem));
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  }


const handlerDelete = async (req, res, getById, del, callback ='') => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const item = await getById(id);
      if (!item) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        await del(id)
        if (callback) {
            await callback(id)
        }
        res.status(HTTP_STATUS_CODES.DELETED)
        res.send()
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  }

  const handlerBoardId = async (req, res, getById) => {
    try {
      const { boardId } = req.params
      if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } else if (!getById(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
    
  }

module.exports = { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerBoardId } 