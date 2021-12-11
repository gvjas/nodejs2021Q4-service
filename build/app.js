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
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(user_router_1.default, { prefix: '/users' });
fastify.register(board_router_1.default, { prefix: '/boards' });
fastify.register(task_router_1.default, { prefix: '/boards/:boardId/tasks' });
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
fastify.register(fastify_swagger_1.default, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
        path: path_1.default.join(__dirname, '../doc/api.yaml'),
    },
});
exports.default = fastify;
