const boardsServices = require('../boards/board.service')
const { tasksRepo } = require('./task.memory.repository');
const handlers = require('../handlers');
const Task = require('./task.model');

const getAll = (boardId) => tasksRepo.getAllByBoardId(boardId);

const delAll = (boardId) => tasksRepo.delAll(boardId);

const getById = (id) => tasksRepo.getById(id);

const pushDB = (task) => tasksRepo.pushDB(new Task({ ...task }));

const update = (task) => tasksRepo.update(task);

const del = (id) => tasksRepo.del(id);

const setUserNull = (userId) => tasksRepo.setUserNull(userId);

const handlerGetAll = (req, res) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req, res) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req, res) => 
    handlers.handlerPost(req, res, pushDB, Task.toResponse)

const handlerPut = (req, res) => 
    handlers.handlerPut(req, res, getById, update, Task.toResponse)

const handlerDelete = (req, res) => 
    handlers.handlerDelete(req, res, getById, del)

const handlerValidId = (req, res) => 
    handlers.handlerValidId(req, res, boardsServices.getById, getAll)

const postItem = {
    schema: {
      body: {
          type: 'object',
          required: ['title',
          'order', 
          'description' ],
          properties: {
          title: {type: 'string'},
          order: {type: 'number'}, 
          description: {type: 'string'}, 
          userId: {type: ['string','null']},
          boardId: {type: 'string'}, 
          columnId: {type: ['string','null']} 
        }
      }
    }
  }
  

module.exports = { delAll, setUserNull, postItem, 
    handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId };
