"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("./task.service");
/**
 * @remarks
 * fastify plugin for register the Task's events
 * @param fasrify - server's instance
 */
const taskRouter = async (fastify) => {
    /**
     * @remarks
     * checking board's id and tasks's id for the all after methods
     * @param name - event for handler
     * @param hook - fastify handler
     */
    fastify.addHook('onRequest', task_service_1.handlerValidId);
    /**
     * declares the routes for the Tasks
     * @remarks
     * descriptions for all after methods
     * @param path - url the path after the prefix "/boards/:boardId/tasks"
     * @param opts - options (schema)
     * @param handler - fastify RouteHandlerMethod
     */
    /** GET
     * @remarks read all Tasks in the database */
    fastify.get('/', task_service_1.handlerGetAll);
    /** GET
     * @remarks read one Task in the database */
    fastify.get('/:id', task_service_1.handlerGetItem);
    /** POST
     * @remarks create Task in the database */
    fastify.post('/', task_service_1.postTaskSchema, task_service_1.handlerPost);
    /** PUT
     * @remarks update Task in the database */
    fastify.put('/:id', task_service_1.postTaskSchema, task_service_1.handlerPut);
    /** DELETE
     * @remarks remove Task in the database */
    fastify.delete(`/:id`, task_service_1.handlerDelete);
};
exports.default = taskRouter;
