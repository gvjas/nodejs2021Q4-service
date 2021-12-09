import { boardsRepo } from './board.memory.repository.js';
import Board from './board.model.js';
import { tasksRepo } from '../tasks/task.memory.repository.js';
import handlers from '../handlers.js';

const getAll = () => boardsRepo.getAll();

const getById = (id: any) => boardsRepo.getById(id);

const pushDB = (board: any) => boardsRepo.pushDB(new Board({...board}));

const update = (board: any) => boardsRepo.update(board);

const del = (id: any) => boardsRepo.del(id);

const handlerGetAll = (req: any, res: any) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req: any, res: any) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: any, res: any) => 
    handlers.handlerPost(req, res, pushDB, Board.toResponse)

const handlerPut = (req: any, res: any) => 
    handlers.handlerPut(req, res, getById, update, Board.toResponse)

const handlerDelete = (req: any, res: any) => 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
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

export { getAll, getById, handlerGetAll, 
    handlerGetItem, handlerPost, handlerPut, handlerDelete, postItem };