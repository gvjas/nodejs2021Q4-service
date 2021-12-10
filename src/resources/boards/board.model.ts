import { v4 as uuid } from 'uuid';
import Column from '../columns/column.model';

class Board {
  column: any;

  columns: any;

  id: any;

  title: any;

  constructor({
    id = uuid(),
    title = 'BOARD',
    columns =  [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  setColumn(column: any) {
    this.column = column
  }

  static toResponse(board: any) {
    return board;
  }
}

export default Board;
