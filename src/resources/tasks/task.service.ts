import { FastifyReply } from 'fastify'

import { getById as getByBoardId } from '../boards/board.service';
import tasksRepo, { delAll as delAllTask, setUserNull as setDelUserNull } from './task.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';
import Task from './task.model';

/**
 *  {@inheritDoc tasksRepo.getAllByBoardId} 
 */
const getAllByBoardId = (boardId?: string): Promise<(Task|undefined)[]> => tasksRepo.getAllByBoardId(boardId);

/**
 *  {@inheritDoc tasksRepo.delAllTask} 
 */
const delAll = (boardId: string): Promise<void> => delAllTask(boardId);

/**
 *  {@inheritDoc tasksRepo.getById} 
 */
const getById = (id: string): Promise<Task|void> => tasksRepo.getById(id);

/**
 *  {@inheritDoc tasksRepo.pushDB} 
 */
const pushDB = (task: Obj): Promise<Task> => 
  tasksRepo.pushDB(new Task({ ...task }));

/**
 *  {@inheritDoc tasksRepo.update} 
 */
const update = (task: Obj): Promise<Task|void> => 
                tasksRepo.update(new Task({ ...task }));

/**
 *  {@inheritDoc tasksRepo.del} 
 */
const del = (id?: string): Promise<void> => tasksRepo.del(id);

/**
 *  {@inheritDoc setDelUserNull} 
 */
const setUserNull = (userId: string): Promise<void> => setDelUserNull(userId);

/**
 *  {@inheritDoc handlers.handlerGetAll} 
 */
const handlerGetAll = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetAll(req, res, getAllByBoardId)

/**
 *  {@inheritDoc handlers.handlerGetItem} 
 */
const handlerGetItem = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetItem(req, res, getById)

/**
 *  {@inheritDoc handlers.handlerPost} 
 */
const handlerPost = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPost(req, res, pushDB, Task.toResponse)

/**
 *  {@inheritDoc handlers.handlerPut} 
 */
const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, Task.toResponse)

/**
 *  {@inheritDoc handlers.handlerDelete} 
 */
const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, undefined)

/**
 *  {@inheritDoc handlers.handlerValidId} 
 */
const handlerValidId = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerValidId(req, res, getByBoardId, getAllByBoardId)

/** template for the create and update for the task's properties */
const postTaskSchema = {
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


export { delAll, setUserNull, postTaskSchema, 
    handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId };
