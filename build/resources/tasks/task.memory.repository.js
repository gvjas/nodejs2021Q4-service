"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delAll = exports.setUserNull = void 0;
const Repository_1 = __importDefault(require("../Repository"));
const tasksRepo = new Repository_1.default();
const setUserNull = async (userId) => {
    tasksRepo.db.forEach((t) => {
        if (t && t.userId === userId)
            t.setUserId(null);
    });
};
exports.setUserNull = setUserNull;
const delAll = async (boardId) => {
    tasksRepo.db = tasksRepo.db.filter((t) => t && t.boardId !== boardId);
};
exports.delAll = delAll;
exports.default = tasksRepo;
