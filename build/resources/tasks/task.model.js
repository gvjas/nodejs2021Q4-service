"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Task {
    constructor({ id = (0, uuid_1.v4)(), title = 'TASK', order = 0, description = 'description', userId = null, // assignee
    boardId = 'boardId', columnId = null } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId; // 
        this.boardId = boardId;
        this.columnId = columnId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setBoardId(boardId) {
        this.boardId = boardId;
    }
    static toResponse(task) {
        return task;
    }
}
exports.default = Task;
