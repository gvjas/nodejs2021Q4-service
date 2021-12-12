"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerValidId = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = exports.postItem = exports.setUserNull = exports.delAll = void 0;
const board_service_1 = require("../boards/board.service");
const task_memory_repository_1 = __importStar(require("./task.memory.repository"));
const handlers_1 = __importDefault(require("../handlers"));
const task_model_1 = __importDefault(require("./task.model"));
const getAllByBoardId = (boardId) => task_memory_repository_1.default.getAllByBoardId(boardId);
const delAll = (boardId) => (0, task_memory_repository_1.delAll)(boardId);
exports.delAll = delAll;
const getById = (id) => task_memory_repository_1.default.getById(id);
const pushDB = (task) => task_memory_repository_1.default.pushDB(new task_model_1.default({ ...task }));
const update = (task) => task_memory_repository_1.default.update(new task_model_1.default({ ...task }));
const del = (id) => task_memory_repository_1.default.del(id);
const setUserNull = (userId) => (0, task_memory_repository_1.setUserNull)(userId);
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
