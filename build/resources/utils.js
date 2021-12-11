"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCodeMesssage = exports.isUuid = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const isUuid = (id) => (0, uuid_1.validate)(id);
exports.isUuid = isUuid;
const responseCodeMesssage = (res, code, message) => {
    res.status(code)
        .header('Content-Type', constants_1.DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message));
};
exports.responseCodeMesssage = responseCodeMesssage;
