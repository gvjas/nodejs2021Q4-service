"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * @remarks
 * class :: Task
 * task for the board
 */
class Task {
    /**
     * @remarks
     * for new task inicializing properties:
     * @param id - new uuid
     * @param title - new task's name
     * @param description - new task's description
     * @param userId - Users's id for the Task
     * @param boardId - Boards's id for the Task
     * @param columnId - Column's id for the Task
     */
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
    /**
     * @remarks
     * update this user's id
     * @param userId - User's id for the Task
     */
    setUserId(userId) {
        this.userId = userId;
    }
    /**
     * @remarks
     * update this board's id
     * @param boardId - Board's id for the Task
     */
    setBoardId(boardId) {
        this.boardId = boardId;
    }
    /**
     * @remarks
     * displays all properties of the element whithout password
     * @param task - Task's instance
     * @returns instance Task
     */
    static toResponse(task) {
        return task;
    }
}
exports.default = Task;
