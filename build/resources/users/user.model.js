"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 *
 *
 * @class User
 */
class User {
    /**
     * Creates an instance of User.
     * @param {*} [{
     *     id = uuid(),
     *     name = 'USER',
     *     login = 'user',
     *     password = 'P@55w0rd'
     *   }={}]
     * @memberof User
     */
    constructor({ id = (0, uuid_1.v4)(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    /**
     *
     *
     * @static
     * @param {User} user
     * @return {*}  {{ id: string, name: string, login: string }}
     * @memberof User
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.default = User;
