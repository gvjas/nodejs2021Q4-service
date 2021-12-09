class Repository {
  db: any;
  constructor() {
    this.db = []
  }

  async getAll() {
    return this.db
  }

  async getAllByBoardId(boardId: any) {
    return this.db.filter( (t: any) => t.boardId === boardId);
  }

  async getById(id: any) {
    return this.db.find((it: any) => it.id === id);
  }

  async pushDB(item: any) {
    await this.db.push(item)
    return item;
  }

  async update(item: any) {
    const { id } = item;
    const indexItem = await this.db.findIndex((it: any) => it.id === id)
    this.db[indexItem] = { ...item}
    return this.db[indexItem]
  }

  async del(id: any) {
    this.db = await this.db.filter((it: any) => it.id !== id)
      
  }
}

export default Repository;