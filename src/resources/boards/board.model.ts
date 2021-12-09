// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import { v4 as uuid } from 'uuid';
import Column from '../columns/column.model.js';

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
