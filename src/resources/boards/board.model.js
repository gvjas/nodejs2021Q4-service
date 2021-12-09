import { v4 as uuid } from 'uuid';
import Column from '../columns/column.model.js';

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

export default Board;
