"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBoardSchema = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = exports.getById = exports.getAll = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const board_model_1 = __importDefault(require("./board.model"));
const task_memory_repository_1 = require("../tasks/task.memory.repository");
const handlers_1 = __importDefault(require("../handlers"));
/**
 *  {@inheritDoc boardsRepo.getAll}
 */
const getAll = () => board_memory_repository_1.boardsRepo.getAll();
exports.getAll = getAll;
/**
 *  {@inheritDoc boardsRepo.getById}
 */
const getById = (id) => board_memory_repository_1.boardsRepo.getById(id);
exports.getById = getById;
/**
 *  {@inheritDoc boardsRepo.pushDB}
 */
const pushDB = (board) => board_memory_repository_1.boardsRepo.pushDB(new board_model_1.default({ ...board }));
/**
 *  {@inheritDoc boardsRepo.update}
 */
const update = (board) => board_memory_repository_1.boardsRepo.update(new board_model_1.default({ ...board }));
/**
 *  {@inheritDoc boardsRepo.del}
 */
const del = (id) => board_memory_repository_1.boardsRepo.del(id);
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
const handlerPost = (req, res) => handlers_1.default.handlerPost(req, res, pushDB, board_model_1.default.toResponse);
exports.handlerPost = handlerPost;
/**
 *  {@inheritDoc handlers.handlerPut
 */
const handlerPut = (req, res) => handlers_1.default.handlerPut(req, res, getById, update, board_model_1.default.toResponse);
exports.handlerPut = handlerPut;
/**
 *  {@inheritDoc handlers.handlerDelete}
 */
const handlerDelete = (req, res) => handlers_1.default.handlerDelete(req, res, getById, del, task_memory_repository_1.delAll);
exports.handlerDelete = handlerDelete;
/** template for the create and update for the board's properties */
const postBoardSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'columns'],
            properties: {
                title: { type: 'string' },
                columns: { type: 'array',
                    items: { type: 'object',
                        properties: {
                            title: { type: 'string' },
                            order: { type: 'number' }
                        }
                    }
                }
            }
        }
    }
};
exports.postBoardSchema = postBoardSchema;
