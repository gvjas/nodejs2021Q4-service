import User from './user.model.js';
import { usersRepo } from './user.memory.repository.js';
import handlers from '../handlers.js';
import { setUserNull } from '../tasks/task.service.js';

const getAll = () => usersRepo.getAll();

const getById = (id: any) => usersRepo.getById(id);

const pushDB = (user: any) => usersRepo.pushDB(new User({ ...user }));

const update = (user: any) => usersRepo.update(user);

const del = (id: any) => usersRepo.del(id);

const handlerGetAll = (req: any, res: any) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req: any, res: any) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req: any, res: any) => 
    handlers.handlerPost(req, res, pushDB, User.toResponse)

const handlerPut = (req: any, res: any) => 
    handlers.handlerPut(req, res, getById, update, User.toResponse)

const handlerDelete = (req: any, res: any) => 
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(userId: any) => any' is not ass... Remove this comment to see the full error message
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
