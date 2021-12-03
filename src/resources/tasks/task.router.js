const { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } = require('../constants');
const {responseCodeMesssage, isUuid} = require('../utils')
const Task = require('./task.model');
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service.js')

const taskRouter = async (fastify)=> {

  fastify.addContentTypeParser('application/json', async (request, payload, done) => {
 
    let res = '';
    try {
      const buffers = []; 
      /* eslint-disable-next-line */   
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

  fastify.get('/boards/:boardId/tasks', async (req, res) => {
      
    try {  
      const { boardId } = req.params
      if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      }
      const tasks = await tasksService.getAll(boardId);
      if (tasks.length === 0) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, tasks.map(Task.toResponse));
      }
      
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });

  fastify.get('/boards/:boardId/tasks/:id', async (req, res) => {
    try {
      const { id, boardId } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } else if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID_BOARD_ID)
      }
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND_BOARD)
      } else if (!task) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, task);
      }
      
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });


  fastify.post('/boards/:boardId/tasks', async (req, res) => {
    try {
      const { boardId } = req.params
      if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      }
      const tasks = await boardsService.getAll(boardId);
      if (tasks.length === 0) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        const { 
          title, 
          order, 
          description, 
          userId,
          columnId 
        } = req.body
        const post = await tasksService.pushDB(new Task({ 
                                                              title, 
                                                              order, 
                                                              description, 
                                                              userId,
                                                              boardId, 
                                                              columnId 
                                                            }))

        responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, post)
      }

    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }

  });

  fastify.put(`/boards/:boardId/tasks/:id`, async (req, res) => {
    try {
      const { id, boardId } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } else if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID_BOARD_ID)
      }
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND_BOARD)
      } else if (!task) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        const { 
          title, 
          order, 
          description, 
          userId,
          columnId 
        } = req.body
        const taskBody = { id, 
                                                    title, 
                                                    order, 
                                                    description, 
                                                    userId,
                                                    boardId, 
                                                    columnId }        
        const updateTask = await tasksService.update(taskBody)
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, updateTask)
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  });

  fastify.delete(`/boards/:boardId/tasks/:id`, async (req, res) => {
    try {
      const { id, boardId } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } else if (!isUuid(boardId)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID_BOARD_ID)
      }
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND_BOARD)
      } else if (!task) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        await tasksService.del(id)
        res.status(HTTP_STATUS_CODES.DELETED)
        res.send()
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  });

}


module.exports = taskRouter;
