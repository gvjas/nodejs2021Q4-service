import { FastifyReply } from 'fastify'

import User from './user.model';
import { usersRepo } from './user.memory.repository';
import handlers, { CustomRequest, Obj } from '../handlers';
import { setUserNull } from '../tasks/task.service';

/**
 *  {@inheritDoc usersRepo.getAll} 
 */
const getAll = (): Promise<(User|undefined)[]> => usersRepo.getAll();

/**
 *  {@inheritDoc usersRepo.getById} 
 */
const getById = (id: string): Promise<User|void> => usersRepo.getById(id);

/**
 *  {@inheritDoc usersRepo.pushDB} 
 */
const pushDB = (user: Obj): Promise<User> => 
    usersRepo.pushDB(new User({ ...user }));

/**
 * {@inheritDoc usersRepo.update} 
 */
const update = (user: Obj): Promise<User|void> => 
    usersRepo.update(new User({ ...user }));

/**
 *  {@inheritDoc usersRepo.del} 
 */
const del = (id?: string): Promise<void> => usersRepo.del(id);

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
    handlers.handlerPost(req, res, pushDB, User.toResponse)

/**
 *  {@inheritDoc handlers.handlerPut} 
 */
const handlerPut = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerPut(req, res, getById, update, User.toResponse)

/**
 *  {@inheritDoc handlers.handlerDelete} 
 */
const handlerDelete = (req: CustomRequest, res: FastifyReply): Promise<void> => 
    handlers.handlerDelete(req, res, getById, del, setUserNull)

/** template for the read some properties for the other schemas */
const itemUserForGet = {
    type: 'object',
            // map item fields to exclude secret fields like "password"
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        login: {type: 'string'},
    }
}

/** template for the read for the all Users and properties */
const getUsersSchema = {
    schema: {
    response: {
        200: {
        type: 'array',
        items: itemUserForGet
        }
    }
    }
}

/** template for the read for the User's properties */
const getUserSchema = {
    schema: {
    response: {
        200: itemUserForGet
    }
    }
}

/** template for the create and update for the User's properties */
const postUserSchema = {
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
    handlerPut, handlerDelete, getUsersSchema, getUserSchema, postUserSchema };
