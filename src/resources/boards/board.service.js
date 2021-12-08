const { boardsRepo } = require('./board.memory.repository');
const Board = require('./board.model');
const { tasksRepo } = require('../tasks/task.memory.repository'); 
const handlers = require('../handlers');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const pushDB = (board) => boardsRepo.pushDB(new Board({...board}));

const update = (board) => boardsRepo.update(board);

const del = (id) => boardsRepo.del(id);

const handlerGetAll = (req, res) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req, res) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req, res) => 
    handlers.handlerPost(req, res, pushDB, Board.toResponse)

const handlerPut = (req, res) => 
    handlers.handlerPut(req, res, getById, update, Board.toResponse)

const handlerDelete = (req, res) => 
    handlers.handlerDelete(req, res, getById, del, tasksRepo.delAll)

const postItem = {
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

module.exports = { getAll, getById, handlerGetAll, 
    handlerGetItem, handlerPost, handlerPut, handlerDelete, postItem };