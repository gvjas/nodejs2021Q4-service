"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Column {
    constructor({ id = (0, uuid_1.v4)(), title = "TITLE", order = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
    static toResponse(column) {
        return column;
    }
}
exports.default = Column;
