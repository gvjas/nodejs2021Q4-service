import { FastifyReply } from 'fastify'

import User from './user.model';
import { usersRepo } from './user.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';
import { setUserNull } from '../tasks/task.service';


const getAll = (): Promise<(User|void)[]> => usersRepo.getAll();

const getById = (id: string): Promise<User|void> => usersRepo.getById(id);

const pushDB = (user: Obj): Promise<User> => 
    usersRepo.pushDB(new User({ ...user }));

const update = (user: Obj): Promise<User|void> => 
    usersRepo.update(new User({ ...user }));

const del = (id?: string): Promise<void> => usersRepo.del(id);

const handlerGetAll = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPost(req, res, pushDB, User.toResponse)

const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, User.toResponse)

const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, setUserNull)

const itemForGet = {
    type: 'object',
            // map item fields to exclude secret fields like "password"
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        login: {type: 'string'},
    }
    }

const getItems = {
    schema: {
    response: {
        200: {
        type: 'array',
        items: itemForGet
        }
    }
    }
}

const getItem = {
    schema: {
    response: {
        200: itemForGet
    }
    }
}

const postItem = {
    schema: {
    body: {
        type: 'object',
        required: ['name', 'login', 'password'],
        properties: {
        name: {type: 'string'},
        login: {type: 'string'},
        password: {type: 'string'},
        }
    }
    }
}

export { handlerGetAll, handlerGetItem, handlerPost, 
    handlerPut, handlerDelete, getItems, getItem, postItem };
