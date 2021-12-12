"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for creating a in-memory data base
 * @param T - a generic that flows through to the type in the data base
 */
class Repository {
    /**
     * Create an empty array for the base
     * @constructor
     */
    constructor() {
        this.db = [];
    }
    /**
     * Get an array of elements from the base
     * @returns promise repository's array by db
     */
    async getAll() {
        return this.db;
    }
    /**
     * Get an array of elements by board's id from the database
     * @param {string} [boardId] id by board
     * @returns promise base array from items by board's id or []
     */
    async getAllByBoardId(boardId) {
        return this.db.filter((t) => t && t.boardId === boardId);
    }
    /**
     * Get a base element by id
     * @param id element's id
     * @returns promise one base element by id or void
     */
    async getById(id) {
        return this.db.find((it) => it && it.id === id);
    }
    /**
     * Add item to database
     * @param item new element
     * @returns promise created element or void
     */
    async pushDB(item) {
        await this.db.push(item);
        return item;
    }
    /**
     * Update the element in the database
     * @param updateItem element with new properties
     * @returns promise updated element or void
     */
    async update(updateItem) {
        const { id } = updateItem;
        await this.db.findIndex((it) => it && it.id === id);
        const indexItem = await this.db.findIndex((it) => it && it.id === id);
        this.db[indexItem] = { ...updateItem };
        return this.db[indexItem];
    }
    /**
     * Delete the element in the database
     * @param id element's id
     * @returns promise void
     */
    async del(id) {
        this.db = await this.db.filter((it) => it && it.id !== id);
    }
}
exports.default = Repository;
