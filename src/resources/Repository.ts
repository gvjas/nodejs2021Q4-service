/**
 * type IidWise an interface for extends generic T
 * @param id - element's id
 * @param boardId - board's id  
 */
export type IidWise = {
  id: string;
  boardId?: string;
}

/**
 * Class for creating a in-memory data base
 * class :: Repository
 * @typeParam T - a generic that flows through to the type in the data base
 */
class Repository<T extends IidWise> {
  db: (T|undefined)[];

  /**
   * Create an empty array for the base
   */
  constructor() {
    this.db = []
  }
  
  /**
   * Get an array of elements from the base
   * @returns promise repository's array by db
   */
  async getAll(): Promise<(T|undefined)[]> {
    return this.db
  }

  /**
   * Get an array of elements by board's id from the database
   * @param boardId - id by board
   * @returns promise base array from items by board's id or []
   */
  async getAllByBoardId(boardId?: string): Promise<(T|undefined)[]> {
    return this.db.filter( (t: T|undefined): boolean|void => t && t.boardId === boardId);
  }

  /**
   * Get a base element by id
   * @param id - element's id 
   * @returns promise one base element by id or void
   */
  async getById(id: string): Promise<T|void> {
    return this.db.find((it: T|undefined): boolean|void => it && it.id === id);
  }

  /**
   * Add item to database
   * @param item - new element
   * @returns promise created element or void
   */
  async pushDB(item: T): Promise<T> {
    await this.db.push(item)
    return item;
  }

  /**
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
   * Delete the element in the database
   * @param id - element's id 
   * @returns promise void
   */
  async del(id?: string): Promise<void> {
    this.db = await this.db.filter((it: T|undefined): boolean|void => it && it.id !== id)
  }
}

export default Repository;