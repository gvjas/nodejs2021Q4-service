"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const handlerId = async (req, res, getById, id) => {
    if (!(0, utils_1.isUuid)(id)) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.NOT_VALID, constants_1.HTTP_RESPOSE_MESSAGES.NOT_VALID);
    }
    const item = await getById(id);
    if (!item) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.NOT_FOUND, constants_1.HTTP_RESPOSE_MESSAGES.NOT_FOUND);
    }
    return item;
};
const handlerGetAll = async (req, res, getAll) => {
    try {
        const { boardId } = req.params;
        const items = await getAll(boardId);
        res.send(items);
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
const handlerGetItem = async (req, res, getById) => {
    try {
        const { id } = req.params;
        const item = await handlerId(req, res, getById, id);
        res.send(item);
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
const handlerPost = async (req, res, pushDB, toResponse) => {
    try {
        const { boardId } = req.params;
        if (boardId) {
            req.body.boardId = boardId;
        }
        const post = await pushDB(req.body);
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.CREATED, toResponse(post));
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
const handlerPut = async (req, res, getById, update, toResponse) => {
    try {
        const { id } = req.params;
        const item = await handlerId(req, res, getById, id);
        req.body.id = item.id;
        const updateItem = await update(req.body);
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.OK, toResponse(updateItem));
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
const handlerDelete = async (req, res, getById, del, callback) => {
    try {
        const { id } = req.params;
        await handlerId(req, res, getById, id);
        if (callback) {
            await callback(id);
        }
        await del(id);
        res.status(constants_1.HTTP_STATUS_CODES.DELETED);
        res.send();
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
const handlerValidId = async (req, res, getByBoardId, getAll) => {
    try {
        const { boardId, id } = req.params;
        await handlerId(req, res, getByBoardId, boardId);
        const tasks = await getAll(boardId);
        const task = await tasks.find((it) => it.id === id);
        if (id && !task) {
            (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.NOT_FOUND, constants_1.HTTP_RESPOSE_MESSAGES.NOT_FOUND);
        }
    }
    catch (e) {
        (0, utils_1.responseCodeMesssage)(res, constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, constants_1.HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
exports.default = { handlerGetAll, handlerGetItem, handlerPost, handlerPut, handlerDelete, handlerValidId };
