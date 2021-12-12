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
exports.postItem = exports.handlerDelete = exports.handlerPut = exports.handlerPost = exports.handlerGetItem = exports.handlerGetAll = exports.getById = exports.getAll = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const board_model_1 = __importDefault(require("./board.model"));
const tasksRepo = __importStar(require("../tasks/task.memory.repository"));
const handlers_1 = __importDefault(require("../handlers"));
const getAll = () => board_memory_repository_1.boardsRepo.getAll();
exports.getAll = getAll;
const getById = (id) => board_memory_repository_1.boardsRepo.getById(id);
exports.getById = getById;
const pushDB = (board) => board_memory_repository_1.boardsRepo.pushDB(new board_model_1.default({ ...board }));
const update = (board) => board_memory_repository_1.boardsRepo.update(new board_model_1.default({ ...board }));
const del = (id) => board_memory_repository_1.boardsRepo.del(id);
const handlerGetAll = (req, res) => handlers_1.default.handlerGetAll(req, res, getAll);
exports.handlerGetAll = handlerGetAll;
const handlerGetItem = (req, res) => handlers_1.default.handlerGetItem(req, res, getById);
exports.handlerGetItem = handlerGetItem;
const handlerPost = (req, res) => handlers_1.default.handlerPost(req, res, pushDB, board_model_1.default.toResponse);
exports.handlerPost = handlerPost;
const handlerPut = (req, res) => handlers_1.default.handlerPut(req, res, getById, update, board_model_1.default.toResponse);
exports.handlerPut = handlerPut;
const handlerDelete = (req, res) => 
// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
handlers_1.default.handlerDelete(req, res, getById, del, tasksRepo.delAll);
exports.handlerDelete = handlerDelete;
const postItem = {
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
exports.postItem = postItem;
