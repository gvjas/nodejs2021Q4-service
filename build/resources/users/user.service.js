"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = exports.getItem = exports.getItems = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const user_memory_repository_1 = require("./user.memory.repository");
const handlers_1 = __importDefault(require("../handlers"));
const task_service_1 = require("../tasks/task.service");
const getAll = () => user_memory_repository_1.usersRepo.getAll();
const getById = (id) => user_memory_repository_1.usersRepo.getById(id);
const pushDB = (user) => user_memory_repository_1.usersRepo.pushDB(new user_model_1.default(Object.assign({}, user)));
const update = (user) => user_memory_repository_1.usersRepo.update(user);
const del = (id) => user_memory_repository_1.usersRepo.del(id);
const handlerGetAll = (req, res) => handlers_1.default.handlerGetAll(req, res, getAll);
exports.handlerGetAll = handlerGetAll;
const handlerGetItem = (req, res) => handlers_1.default.handlerGetItem(req, res, getById);
exports.handlerGetItem = handlerGetItem;
const handlerPost = (req, res) => handlers_1.default.handlerPost(req, res, pushDB, user_model_1.default.toResponse);
exports.handlerPost = handlerPost;
const handlerPut = (req, res) => handlers_1.default.handlerPut(req, res, getById, update, user_model_1.default.toResponse);
exports.handlerPut = handlerPut;
const handlerDelete = (req, res) => handlers_1.default.handlerDelete(req, res, getById, del, task_service_1.setUserNull);
exports.handlerDelete = handlerDelete;
const itemForGet = {
    type: 'object',
    // map item fields to exclude secret fields like "password"
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
    }
};
const getItems = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: itemForGet
            }
        }
    }
};
exports.getItems = getItems;
const getItem = {
    schema: {
        response: {
            200: itemForGet
        }
    }
};
exports.getItem = getItem;
const postItem = {
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
exports.postItem = postItem;
