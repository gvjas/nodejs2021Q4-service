"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const column_model_1 = __importDefault(require("../columns/column.model"));
/**
 * @remarks
 * class :: Board
 * board for the tasks
 */
class Board {
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
    constructor({ id = (0, uuid_1.v4)(), title = 'BOARD', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((c) => new column_model_1.default(c));
    }
    /**
     * @remarks
     * create new Column
     * @param column - object for the board's columns array
     */
    setColumn(column) {
        this.column = new column_model_1.default(column);
    }
    /**
     * @remarks
     * displays all properties of the element whithout password
     * @param board - Board's instance
     * @returns instance Board
     */
    static toResponse(board) {
        return board;
    }
}
exports.default = Board;
