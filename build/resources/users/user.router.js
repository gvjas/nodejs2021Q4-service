"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user.service");
/**
 * @remarks
 * fastify plugin for register the User's events
 * @param fasrify - server's instance
 */
const userRouter = async (fastify) => {
    /**
     * declares the routes for the Users
     * @remarks
     * descriptions for all after methods
     * @param path - url the path after the prefix "/users"
     * @param opts - options (schema)
     * @param handler - fastify RouteHandlerMethod
     */
    /** GET
     * @remarks read all Users in the database */
    fastify.get('/', user_service_1.getUsersSchema, user_service_1.handlerGetAll);
    /** GET
     * @remarks read one User in the database */
    fastify.get('/:id', user_service_1.getUserSchema, user_service_1.handlerGetItem);
    /** POST
     * @remarks create User in the database */
    fastify.post('/', user_service_1.postUserSchema, user_service_1.handlerPost);
    /** PUT
     * @remarks update User in the database */
    fastify.put(`/:id`, user_service_1.postUserSchema, user_service_1.handlerPut);
    /** DELETE
     * @remarks remove User in the database */
    fastify.delete(`/:id`, user_service_1.handlerDelete);
};
exports.default = userRouter;
