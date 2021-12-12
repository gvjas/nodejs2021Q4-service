"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
/**
 * Handler for server response
 * @param res fastify reply
 * @param code numeric server response
 * @param message object for the response code
 * @returns type void
 */
const responseCodeMesssage = (res, code, message) => {
    res.status(code)
        .header('Content-Type', constants_1.DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message));
};
/**
 * Treatment and check id for other handlers and server response
 * @param req fastify request
 * @param res fastify reply
 * @callback getById get an item by id and type for T generic
 * @returns promise element type T or void ("bad request" server response)
 */
const handlerId = async (req, res, getById, id) => {
    if (!(0, uuid_1.validate)(id)) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.NOT_VALID, constants_1.HTTP_RESPOSE_MESSAGES.NOT_VALID);
    }
    return await getById(id) || responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.NOT_FOUND, constants_1.HTTP_RESPOSE_MESSAGES.NOT_FOUND);
};
/**
 * GET treatment of all elements from the base and server response
 * @param req server fastify request
 * @param res server fastify reply
 * @callback getAll get all elements from the base and type for generic T
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetAll = async (req, res, getAll) => {
    try {
        const { boardId } = req.params;
        const items = await getAll(boardId);
        res.send(items);
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
/**
 * GET treatment of one element by number from the database
 * @param req fastify request
 * @param res fastify reply
 * @callback getById for get id handler
 * @returns promise void ("OK" or "error" server response)
 */
const handlerGetItem = async (req, res, getById) => {
    try {
        const { id } = req.params;
        const item = await handlerId(req, res, getById, id);
        res.send(item);
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
/**
 * POST handler for creating a new element in the database and server response
 * @param req fastify request
 * @param res fastify reply
 * @callback pushDB append new item in the data base
 * @callback toResponse displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPost = async (req, res, pushDB, toResponse) => {
    try {
        const { boardId } = req.params;
        if (boardId) {
            req.body.boardId = boardId;
        }
        const post = await pushDB({ ...req.body });
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.CREATED, toResponse(post));
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
/**
 * PUT handler to update the item in the database and server response
 * @param req fastify request
 * @param res fastify reply
 * @callback getById get id for handlerId
 * @callback update updates the properties of the item in the database
 * @callback toResponse displays all or some properties of the element
 * @returns promise void ("OK" or "error" server response)
 */
const handlerPut = async (req, res, getById, update, toResponse) => {
    try {
        const { id } = req.params;
        await handlerId(req, res, getById, id);
        const updateItem = await update(req.body);
        if (updateItem) {
            updateItem.id = id;
            responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.OK, toResponse(updateItem));
        }
        ;
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
/**
 * DELETE element removal handler in the database and server response
 * @param req fastify request
 * @param res fastify reply
 * @callback getById get id for handlerId
 * @callback del deleting an item in the database
 * @callback callback updates the properties associated with other elements in the database
 *                    (e.g. sets the id as zero or del board's tasks)
 * @returns promise void ("OK" or "error" server response)
 */
const handlerDelete = async (req, res, getById, del, callback) => {
    try {
        const { id } = req.params;
        await handlerId(req, res, getById, id);
        if (id && callback) {
            await callback(id);
        }
        await del(id);
        res.status(constants_1.HTTP_STATUS_CODES.DELETED);
        res.send();
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
/**
 * For hook for all methods - checking board's id and tasks's id
 * in the database for the board's tasks and server response
 * @param req fastify request
 * @param res fastify reply
 * @callback getByBoardId for handlerId get id for type generic U
 * @callback getAll get all elements from the base and type for generic T
 * @returns promise void ("bad request" or "error" server response)
 */
const handlerValidId = async (req, res, getByBoardId, getAll) => {
    try {
        const { boardId, id } = req.params;
        await handlerId(req, res, getByBoardId, boardId);
        const tasks = await getAll(boardId);
        const task = await tasks.find((t) => t && t.id === id);
        if (id && !task) {
            responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.NOT_FOUND, constants_1.HTTP_RESPOSE_MESSAGES.NOT_FOUND);
        }
    }
    catch (e) {
        responseCodeMesssage(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
exports.default = { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId };
