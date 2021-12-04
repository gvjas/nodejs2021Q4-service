const { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } = require('../constants');
const {responseCodeMesssage, isUuid} = require('../utils')
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const postItems = {
  schema: {
    body: {
        type: 'object',
        required: ['title', 'columns'],
        properties: {
        title: {type: 'string'},
        columns: {type: 'array', 
          items: { type: 'object', 
            properties: {
              title: {type: 'string'}, 
              order: {type: 'number'}
            }
          }
        }
      }
    }
  }
}

const boardRouter = async (fastify)=> {

  fastify.addContentTypeParser('application/json', async (request, payload, done) => {
 
    let res = '';
    try {
      const buffers = []; 
      for await (const chunk of payload) {
        buffers.push(chunk);
      }
      res = JSON.parse(Buffer.concat(buffers).toString())
    } catch (err) {
      err.statusCode = HTTP_STATUS_CODES.NOT_VALID
      done(HTTP_RESPOSE_MESSAGES.NOT_JSON, undefined)
    }
    return res
  })

  fastify.get('/', async (req, res) => {
    try {  
      const boards = await boardsService.getAll();
      responseCodeMesssage(res, HTTP_STATUS_CODES.OK, boards.map(Board.toResponse))
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });

  fastify.get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      }
      const board = await boardsService.getById(id);
      if (!board) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, Board.toResponse(board));
      }      
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });

  fastify.post('', postItems, async (req, res) => {
    try {
      const { title, columns } = req.body
      const post = await boardsService.pushDB(new Board({title, columns}))
      responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, Board.toResponse(post));
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });


  fastify.put(`/:id`, postItems, async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const boardById = await boardsService.getById(id);
      if (!boardById) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        const { title, columns } = req.body
        const board = { id, title, columns }
        const updateBoard = await boardsService.update(board)
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, Board.toResponse(updateBoard));
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });


  fastify.delete(`/:id`, async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const board = await boardsService.getById(id);
      if (!board) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        await boardsService.del(id)
        await tasksService.delAll(id)
        res.status(HTTP_STATUS_CODES.DELETED)
        res.send()
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  });
}


module.exports = boardRouter;
