"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserSchema = exports.getUserSchema = exports.getUsersSchema = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const user_memory_repository_1 = require("./user.memory.repository");
const handlers_1 = __importDefault(require("../handlers"));
const task_service_1 = require("../tasks/task.service");
/**
 *  {@inheritDoc usersRepo.getAll}
 */
const getAll = () => user_memory_repository_1.usersRepo.getAll();
/**
 *  {@inheritDoc usersRepo.getById}
 */
const getById = (id) => user_memory_repository_1.usersRepo.getById(id);
/**
 *  {@inheritDoc usersRepo.pushDB}
 */
const pushDB = (user) => user_memory_repository_1.usersRepo.pushDB(new user_model_1.default({ ...user }));
/**
 * {@inheritDoc usersRepo.update}
 */
const update = (user) => user_memory_repository_1.usersRepo.update(new user_model_1.default({ ...user }));
/**
 *  {@inheritDoc usersRepo.del}
 */
const del = (id) => user_memory_repository_1.usersRepo.del(id);
/**
 *  {@inheritDoc handlers.handlerGetAll}
 */
const handlerGetAll = (req, res) => handlers_1.default.handlerGetAll(req, res, getAll);
exports.handlerGetAll = handlerGetAll;
/**
 *  {@inheritDoc handlers.handlerGetItem}
 */
const handlerGetItem = (req, res) => handlers_1.default.handlerGetItem(req, res, getById);
exports.handlerGetItem = handlerGetItem;
/**
 *  {@inheritDoc handlers.handlerPost}
 */
const handlerPost = (req, res) => handlers_1.default.handlerPost(req, res, pushDB, user_model_1.default.toResponse);
exports.handlerPost = handlerPost;
/**
 *  {@inheritDoc handlers.handlerPut}
 */
const handlerPut = (req, res) => handlers_1.default.handlerPut(req, res, getById, update, user_model_1.default.toResponse);
exports.handlerPut = handlerPut;
/**
 *  {@inheritDoc handlers.handlerDelete}
 */
const handlerDelete = (req, res) => handlers_1.default.handlerDelete(req, res, getById, del, task_service_1.setUserNull);
exports.handlerDelete = handlerDelete;
/** template for the read some properties for the other schemas */
const itemUserForGet = {
    type: 'object',
    // map item fields to exclude secret fields like "password"
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
    }
};
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
};
exports.getUsersSchema = getUsersSchema;
/** template for the read for the User's properties */
const getUserSchema = {
    schema: {
        response: {
            200: itemUserForGet
        }
    }
};
exports.getUserSchema = getUserSchema;
/** template for the create and update for the User's properties */
const postUserSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            }
        }
    }
};
exports.postUserSchema = postUserSchema;
