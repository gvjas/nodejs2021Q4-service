"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_service_1 = require("./board.service");
/**
 * @remarks
 * fastify plugin for register the Board's events
 * @param fasrify - server's instance
 */
const boardRouter = async (fastify) => {
    /**
   * declares the routes for the Boards
   * @remarks
   * descriptions for all after methods
   * @param path - url the path after the prefix "/boards"
   * @param opts - options (schema)
   * @param handler - fastify RouteHandlerMethod
   */
    /** GET
     * @remarks read all Boards in the database */
    fastify.get('/', board_service_1.handlerGetAll);
    /** GET
     * @remarks read one Board in the database */
    fastify.get('/:id', board_service_1.handlerGetItem);
    /** POST
     * @remarks create Board in the database */
    fastify.post('/', board_service_1.postBoardSchema, board_service_1.handlerPost);
    /** PUT
     * @remarks update Board in the database */
    fastify.put(`/:id`, board_service_1.postBoardSchema, board_service_1.handlerPut);
    /** DELETE
     * @remarks remove Board in the database */
    fastify.delete(`/:id`, board_service_1.handlerDelete);
};
exports.default = boardRouter;
