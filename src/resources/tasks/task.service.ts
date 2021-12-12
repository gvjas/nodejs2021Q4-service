import { FastifyReply } from 'fastify'

import { getById as getByBoardId } from '../boards/board.service';
import tasksRepo, { delAll as delAllTask, setUserNull as setDelUserNull } from './task.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';
import Task from './task.model';

const getAllByBoardId = (boardId?: string): Promise<(Task|undefined)[]> => tasksRepo.getAllByBoardId(boardId);

const delAll = (boardId: string): Promise<void> => delAllTask(boardId);

const getById = (id: string): Promise<Task|void> => tasksRepo.getById(id);

const pushDB = (task: Obj): Promise<Task> => 
  tasksRepo.pushDB(new Task({ ...task }));

const update = (task: Obj): Promise<Task|void> => 
                tasksRepo.update(new Task({ ...task }));

const del = (id?: string): Promise<void> => tasksRepo.del(id);

const setUserNull = (userId: string): Promise<void> => setDelUserNull(userId);

const handlerGetAll = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetAll(req, res, getAllByBoardId)

const handlerGetItem = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPost(req, res, pushDB, Task.toResponse)

const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, Task.toResponse)

const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, undefined)

const handlerValidId = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerValidId(req, res, getByBoardId, getAllByBoardId)

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
