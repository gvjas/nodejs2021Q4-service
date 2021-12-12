"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const column_model_1 = __importDefault(require("../columns/column.model"));
class Board {
    constructor({ id = (0, uuid_1.v4)(), title = 'BOARD', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((c) => new column_model_1.default(c));
    }
    setColumn(column) {
        this.column = new column_model_1.default(column);
    }
    static toResponse(board) {
        return board;
    }
}
exports.default = Board;
