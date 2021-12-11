import { v4 as uuid } from 'uuid';

class Column {
  id: string;

  order: number;

  title: string;

  constructor({
    id = uuid(),
    title = "TITLE",
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: Column): Column {
    return column;
  }
}

export default Column;
