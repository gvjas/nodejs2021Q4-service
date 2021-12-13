"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const path_1 = __importDefault(require("path"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
/**
 * @remarks
 * server's instance
 * @param opts  - logger - is logging server's events?
 */
const fastify = (0, fastify_1.default)({ logger: true });
/**
 * @remarks
 * add plugins and routes to the fastify
 * @param plugin - event's object (GET, POST, PUT, DELETE)
 * @param opts - prefix for the url path
 */
fastify.register(user_router_1.default, { prefix: '/users' });
fastify.register(board_router_1.default, { prefix: '/boards' });
fastify.register(task_router_1.default, { prefix: '/boards/:boardId/tasks' });
const swaggerOpts = {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
        path: path_1.default.join(__dirname, '../doc/api.yaml'),
        baseDir: ''
    },
};
/**
 * @remarks
 * add plugins and routes to the fastify
 * @param plugin - event's object (DOC for testing)
 * @param opts - swagger document's options
 */
fastify.register(fastify_swagger_1.default, swaggerOpts);
exports.default = fastify;
