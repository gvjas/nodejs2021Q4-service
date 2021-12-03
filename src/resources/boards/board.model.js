const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = 'board',
    // password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    // this.password = password;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
