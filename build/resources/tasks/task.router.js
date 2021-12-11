"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("./task.service");
const taskRouter = async (fastify) => {
    fastify.addHook('onRequest', task_service_1.handlerValidId);
    fastify.get('/', task_service_1.handlerGetAll);
    fastify.get('/:id', task_service_1.handlerGetItem);
    fastify.post('/', task_service_1.handlerPost);
    fastify.put('/:id', task_service_1.handlerPut);
    fastify.delete(`/:id`, task_service_1.handlerDelete);
};
exports.default = taskRouter;
