import { v4 as uuid } from 'uuid';
import Column from '../columns/column.model';

/**
 * class :: Board
 * @remarks
 * board for the tasks
 */
class Board {
  /** not required for the each Board columns */
  column?: Column;
  /** required for the each Board */
  columns: (Column|undefined)[];
  /** required different uuid for the each Board  */
  id: string;
  /** required for the each Board */
  title: string;

  /**
   * @remarks
   * for the board inicializing properties:
   * @param id - different uuid
   * @param title - board's title
   * @param columns - board's columns
   */
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns =  []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((c: { order: number, title: string }): Column => new Column(c));
  }

  /**
   * @remarks
   * create new Column
   * @param column - object for the board's columns array
   */
  setColumn(column: { order: number, title: string }): void {
    this.column = new Column(column)
  }

  /**
   * @remarks
   * displays all properties for the Board
   * @param board - Board's instance 
   * @returns instance Board
   */
  static toResponse(board: Board): Board {
    return board;
  }
}

export default Board;
