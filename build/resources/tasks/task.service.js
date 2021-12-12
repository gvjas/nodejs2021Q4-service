"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerValidId = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = exports.postItem = exports.setUserNull = exports.delAll = void 0;
const board_service_1 = require("../boards/board.service");
const task_memory_repository_1 = __importDefault(require("./task.memory.repository"));
const handlers_1 = __importDefault(require("../handlers"));
const task_model_1 = __importDefault(require("./task.model"));
const getAllByBoardId = (boardId) => task_memory_repository_1.default.getAllByBoardId(boardId);
// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
const delAll = (boardId) => task_memory_repository_1.default.delAll(boardId);
exports.delAll = delAll;
const getById = (id) => task_memory_repository_1.default.getById(id);
const pushDB = (task) => task_memory_repository_1.default.pushDB(new task_model_1.default({ ...task }));
const update = (task) => task_memory_repository_1.default.update(new task_model_1.default({ ...task }));
const del = (id) => task_memory_repository_1.default.del(id);
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUserNull' does not exist on type 'Rep... Remove this comment to see the full error message
const setUserNull = (userId) => task_memory_repository_1.default.setUserNull(userId);
exports.setUserNull = setUserNull;
const handlerGetAll = (req, res) => handlers_1.default.handlerGetAll(req, res, getAllByBoardId);
exports.handlerGetAll = handlerGetAll;
const handlerGetItem = (req, res) => handlers_1.default.handlerGetItem(req, res, getById);
exports.handlerGetItem = handlerGetItem;
const handlerPost = (req, res) => handlers_1.default.handlerPost(req, res, pushDB, task_model_1.default.toResponse);
exports.handlerPost = handlerPost;
const handlerPut = (req, res) => handlers_1.default.handlerPut(req, res, getById, update, task_model_1.default.toResponse);
exports.handlerPut = handlerPut;
const handlerDelete = (req, res) => handlers_1.default.handlerDelete(req, res, getById, del, undefined);
exports.handlerDelete = handlerDelete;
const handlerValidId = (req, res) => handlers_1.default.handlerValidId(req, res, board_service_1.getById, getAllByBoardId);
exports.handlerValidId = handlerValidId;
const postItem = {
    schema: {
        body: {
            type: 'object',
            required: ['title',
                'order',
                'description'],
            properties: {
                title: { type: 'string' },
                order: { type: 'number' },
                description: { type: 'string' },
                userId: { type: ['string', 'null'] },
                boardId: { type: 'string' },
                columnId: { type: ['string', 'null'] }
            }
        }
    }
};
exports.postItem = postItem;
