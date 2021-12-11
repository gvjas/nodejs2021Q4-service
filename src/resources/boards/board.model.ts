import { v4 as uuid } from 'uuid';
import Column from '../columns/column.model';


class Board {
  column?: Column;

  columns: (Column|undefined)[];

  id: string;

  title: string;

  constructor({
    id = uuid(),
    title = 'BOARD',
    columns =  []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((c): Column => new Column(c));
  }

  setColumn(column: { order: number, title: string }): void {
    this.column = new Column(column)
  }

  static toResponse(board: Board): Board {
    return board;
  }
}

export default Board;
