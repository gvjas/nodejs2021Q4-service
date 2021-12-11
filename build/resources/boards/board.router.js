"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_service_1 = require("./board.service");
const boardRouter = async (fastify) => {
    fastify.get('/', board_service_1.handlerGetAll);
    fastify.get('/:id', board_service_1.handlerGetItem);
    fastify.post('/', board_service_1.postItem, board_service_1.handlerPost);
    fastify.put(`/:id`, board_service_1.postItem, board_service_1.handlerPut);
    fastify.delete(`/:id`, board_service_1.handlerDelete);
};
exports.default = boardRouter;
