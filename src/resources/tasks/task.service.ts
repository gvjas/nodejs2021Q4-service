import { getById as getByBoardId } from '../boards/board.service';
import tasksRepo from './task.memory.repository';
import handlers from '../handlers';
import Task from './task.model';

const getAll = (boardId: any) => tasksRepo.getAllByBoardId(boardId);

// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
const delAll = (boardId: any) => tasksRepo.delAll(boardId);

const getById = (id: any) => tasksRepo.getById(id);

const pushDB = (task: any) => tasksRepo.pushDB(new Task({ ...task }));

const update = (task: any) => tasksRepo.update(task);

const del = (id: any) => tasksRepo.del(id);

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUserNull' does not exist on type 'Rep... Remove this comment to see the full error message
const setUserNull = (userId: any) => tasksRepo.setUserNull(userId);

const handlerGetAll = (req: any, res: any) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req: any, res: any) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: any, res: any) => 
    handlers.handlerPost(req, res, pushDB, Task.toResponse)

const handlerPut = (req: any, res: any) => 
    handlers.handlerPut(req, res, getById, update, Task.toResponse)

const handlerDelete = (req: any, res: any) => 
    handlers.handlerDelete(req, res, getById, del, undefined)

const handlerValidId = (req: any, res: any) => 
    handlers.handlerValidId(req, res, getByBoardId, getAll)

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


export { delAll, setUserNull, postItem, 
    handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId };
