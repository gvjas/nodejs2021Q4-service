const uuid = require('uuid').v4;

const Column = require('../columns/column.model')

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns =  [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  setColumn(column) {
    this.column = column
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
