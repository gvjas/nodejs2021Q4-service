"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * class :: User
 * @remarks
 * user's administration properties and view this
 */
class User {
    /**
     * @remarks
     * for new user inicializing properties:
     * @param id - new uuid
     * @param name - new user's name
     * @param login - new user's name
     * @param password - new user's password
     */
    constructor({ id = (0, uuid_1.v4)(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    /**
     * @remarks
     * displays some properties of the element whithout password
     * @param user - User's instance
     * @returns object with id, name, login but hidden password
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.default = User;
