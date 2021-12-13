import { v4 as uuid } from 'uuid';

/**
 * class :: Column
 * @remarks
 * column for the array columns for the board
 */
class Column {
  /** required different uuid for the each Column  */
  id: string;
  /** required order for the each Column */
  order: number;
  /** required for the each Column */
  title: string;

  /**
   * @remarks
   * for new column inicializing properties:
   * @param id - uuid
   * @param title - columns's title
   * @param order- columns's order
   */
  constructor({
    id = uuid(),
    title = "TITLE",
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * @remarks
   * displays all properties for the Column
   * @param column - Column's instance 
   * @returns instance Column
   */
  static toResponse(column: Column): Column {
    return column;
  }
}

export default Column;
