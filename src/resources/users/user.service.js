import User from './user.model.js';
import { usersRepo } from './user.memory.repository.js';
import handlers from '../handlers.js';
import { setUserNull } from '../tasks/task.service.js';

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const pushDB = (user) => usersRepo.pushDB(new User({ ...user }));

const update = (user) => usersRepo.update(user);

const del = (id) => usersRepo.del(id);

const handlerGetAll = (req, res) => handlers.handlerGetAll(req, res, getAll)

const handlerGetItem = (req, res) => handlers.handlerGetItem(req, res, getById)

const handlerPost = (req, res) => 
    handlers.handlerPost(req, res, pushDB, User.toResponse)

const handlerPut = (req, res) => 
    handlers.handlerPut(req, res, getById, update, User.toResponse)

const handlerDelete = (req, res) => 
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
