"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delAll = exports.setUserNull = void 0;
const Repository_1 = __importDefault(require("../Repository"));
/**
 * @remarks
 * database with CRUD methods for the Task
 */
const tasksRepo = new Repository_1.default();
/**
 * @remarks
 * update property userId as null for the deleted users's for the all tasks
 * @param userId - User's id for this tasks
 * @returns promise set userId = null
 */
const setUserNull = async (userId) => {
    tasksRepo.db.forEach((t) => {
        if (t && t.userId === userId)
            t.setUserId(null);
    });
};
exports.setUserNull = setUserNull;
/**
 * @remarks
 * delete all tasks for the deleted boards
 * @param boardId - Board's id for this tasks
 * @returns promise update database without deleted tasks
 */
const delAll = async (boardId) => {
    tasksRepo.db = tasksRepo.db.filter((t) => t && t.boardId !== boardId);
};
exports.delAll = delAll;
exports.default = tasksRepo;
