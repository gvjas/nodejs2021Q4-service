"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user.service");
const userRouter = async (fastify) => {
    fastify.get('/', user_service_1.getItems, user_service_1.handlerGetAll);
    fastify.get('/:id', user_service_1.getItem, user_service_1.handlerGetItem);
    fastify.post('/', user_service_1.postItem, user_service_1.handlerPost);
    fastify.put(`/:id`, user_service_1.postItem, user_service_1.handlerPut);
    fastify.delete(`/:id`, user_service_1.handlerDelete);
};
exports.default = userRouter;
