export interface IidWise {
  boardId?: string;
  id: string;
}

class Repository<T extends IidWise> {
  db: (T|undefined)[];

  constructor() {
    this.db = []
  }

  async getAll(): Promise<(T|undefined)[]> {
    return this.db
  }

  async getAllByBoardId(boardId?: string): Promise<(T|undefined)[]> {
    return this.db.filter( (t: T|undefined): boolean|void => t && t.boardId === boardId);
  }

  async getById(id: string): Promise<T|undefined> {
    return this.db.find((it: T|undefined): boolean|void => it && it.id === id);
  }

  async pushDB(item: T): Promise<T> {
    await this.db.push(item)
    return item;
  }

  async update(updateItem: T): Promise<T|void> {
    const { id } = updateItem;
    await this.db.findIndex((it: T|undefined): boolean|void => it && it.id === id);
    const indexItem = await this.db.findIndex((it: T|undefined): boolean|void => it && it.id === id);
    this.db[indexItem] = { ...updateItem }
    return this.db[indexItem]
  }

  async del(id?: string): Promise<void> {
    this.db = await this.db.filter((it: T|undefined): boolean|void => it && it.id !== id)
      
  }
}

export default Repository;