class Repository {
  constructor() {
    this.db = []
  }

  async getAll() {
    return this.db
  }

  async getAllByBoardId(boardId) {
    return this.db.filter( (t) => t.boardId === boardId);
  }

  async getById(id) {
    return this.db.find((it) => it.id === id)
  }

  async pushDB(item) {
    await this.db.push(item)
    return item;
  }

  async update(item) {
    const { id } = item;
    const indexItem = await this.db.findIndex((it) => it.id === id)
    this.db[indexItem] = { ...item}
    return this.db[indexItem]
  }

  async del(id) {
    this.db = await this.db.filter((it) => it.id !== id)
      
  }
}

module.exports = Repository