"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Board {
    constructor({ id = (0, uuid_1.v4)(), title = 'BOARD', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
    setColumn(column) {
        this.column = column;
    }
    static toResponse(board) {
        return board;
    }
}
exports.default = Board;
