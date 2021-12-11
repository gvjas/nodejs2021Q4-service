import { FastifyReply } from 'fastify'

import { boardsRepo } from './board.memory.repository';
import Board from './board.model';
import * as tasksRepo from '../tasks/task.memory.repository';
import handlers, { CustomRequest} from '../handlers';

const getAll = (): Promise<(Board|undefined)[]> => boardsRepo.getAll();

const getById = (id?: string): Promise<Board|undefined> => boardsRepo.getById(id);

const pushDB = (board: {[key: string]: (string | number | null | undefined | object)}): 
  Promise<Board> => boardsRepo.pushDB(new Board({ ...board }));

const update = (board: {[key: string]: (string | number | null | undefined | object)}): 
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