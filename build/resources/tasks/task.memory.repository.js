"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("../Repository"));
const tasksRepo = new Repository_1.default();
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUserNull' does not exist on type 'Rep... Remove this comment to see the full error message
tasksRepo.setUserNull = async (userId) => {
    await tasksRepo.db.forEach((t) => { if (t.userId === userId)
        t.setUserId(null); });
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'delAll' does not exist on type 'Reposito... Remove this comment to see the full error message
tasksRepo.delAll = async (boardId) => {
    tasksRepo.db = await tasksRepo.db.filter((t) => t.boardId !== boardId);
};
exports.default = tasksRepo;
