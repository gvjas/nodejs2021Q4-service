import { FastifyReply } from 'fastify'

import { boardsRepo } from './board.memory.repository';
import Board from './board.model';
import {delAll } from '../tasks/task.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';

const getAll = (): Promise<(Board|undefined)[]> => boardsRepo.getAll();

const getById = (id: string): Promise<Board|void> => boardsRepo.getById(id);

const pushDB = (board: Obj): 
  Promise<Board> => boardsRepo.pushDB(new Board({ ...board }));

const update = (board: Obj): 
  Promise<Board|void> => boardsRepo.update(new Board({ ...board }));

const del = (id: string): Promise<void> => boardsRepo.del(id);

const handlerGetAll = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req: CustomRequest, res: FastifyReply): Promise<void> => 
  handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPost(req, res, pushDB, Board.toResponse)

const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, Board.toResponse)

const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, delAll)

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