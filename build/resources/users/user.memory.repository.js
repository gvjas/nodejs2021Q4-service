"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const Repository_1 = __importDefault(require("../Repository"));
/**
 * @remarks
 * database with CRUD methods for the User
 */
const usersRepo = new Repository_1.default();
exports.usersRepo = usersRepo;
