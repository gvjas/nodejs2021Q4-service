/**
 * @remarks
 * type IidWise an interface for extends generic T
 * @param id - element's id
 * @param boardId - board's id  
 */
export type IidWise = {
  id: string;
  boardId?: string;
}

/**
 * class :: Repository
 * @remarks
 * in-memory database and CRUD methods
 * @typeParam T - a generic type of objects the database contains 
 */
class Repository<T extends IidWise> {
  db: (T|undefined)[];

  /**
   * @remarks
   * Create and inicializing empty array for the new base
   */
  constructor() {
    this.db = []
  }
  
  /**
   * @remarks
   * Get an array of elements from the base
   * @returns promise repository's array by db
   */
  async getAll(): Promise<(T|undefined)[]> {
    return this.db
  }

  /**
   * @remarks
   * Get an array of elements by board's id from the database
   * @param boardId - board's id
   * @returns promise base array from items by board's id or []
   */
  async getAllByBoardId(boardId?: string): Promise<(T|undefined)[]> {
    return this.db.filter( (t: T|undefined): boolean|void => t && t.boardId === boardId);
  }

  /**
   * @remarks
   * Get a base element by id
   * @param id - element's id 
   * @returns promise one base element by id or void
   */
  async getById(id: string): Promise<T|void> {
    return this.db.find((it: T|undefined): boolean|void => it && it.id === id);
  }

  /**
   * @remarks
   * Add item to database
   * @param item - new element
   * @returns promise created element or void
   */
  async pushDB(item: T): Promise<T> {
    await this.db.push(item)
    return item;
  }

  /**
   * @remarks
   * Update the element in the database
   * @param updateItem - element with new properties 
   * @returns promise updated element or void
   */
  async update(updateItem: T): Promise<T|void> {
    const { id } = updateItem;
    await this.db.findIndex((it: T|undefined): boolean|void => it && it.id === id);
    const indexItem = await this.db.findIndex((it: T|undefined): boolean|void => it && it.id === id);
    this.db[indexItem] = { ...updateItem }
    return this.db[indexItem]
  }

  /**
   * @remarks
   * Delete the element in the database
   * @param id - element's id 
   * @returns promise void
   */
  async del(id?: string): Promise<void> {
    this.db = await this.db.filter((it: T|undefined): boolean|void => it && it.id !== id)
  }
}

export default Repository;