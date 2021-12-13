import { FastifyReply } from 'fastify'

import { boardsRepo } from './board.memory.repository';
import Board from './board.model';
import { delAll } from '../tasks/task.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';

/**
 *  {@inheritDoc boardsRepo.getAll} 
 */
const getAll = (): Promise<(Board|undefined)[]> => boardsRepo.getAll();

/**
 *  {@inheritDoc boardsRepo.getById} 
 */
const getById = (id: string): Promise<Board|void> => boardsRepo.getById(id);

/**
 *  {@inheritDoc boardsRepo.pushDB} 
 */
const pushDB = (board: Obj): 
  Promise<Board> => boardsRepo.pushDB(new Board({ ...board }));

/**
 *  {@inheritDoc boardsRepo.update} 
 */
const update = (board: Obj): 
  Promise<Board|void> => boardsRepo.update(new Board({ ...board }));

/**
 *  {@inheritDoc boardsRepo.del} 
 */
const del = (id: string): Promise<void> => boardsRepo.del(id);

/**
 *  {@inheritDoc handlers.handlerGetAll} 
 */
const handlerGetAll = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetAll(req, res, getAll)

/**
 *  {@inheritDoc handlers.handlerGetItem} 
 */
const handlerGetItem = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetItem(req, res, getById)

/**
 *  {@inheritDoc handlers.handlerPost} 
 */
const handlerPost = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPost(req, res, pushDB, Board.toResponse)

/**
 *  {@inheritDoc handlers.handlerPut 
 */
const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, Board.toResponse)

/**
 *  {@inheritDoc handlers.handlerDelete} 
 */
const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, delAll)

/** template for the create and update for the board's properties */
const postBoardSchema = {
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
    handlerGetItem, handlerPost, handlerPut, handlerDelete, postBoardSchema };