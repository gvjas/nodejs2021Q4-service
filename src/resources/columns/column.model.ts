import { v4 as uuid } from 'uuid';

class Column {
  id: any;

  order: any;

  title: any;

  constructor({
    id = uuid(),
    title = "TITLE",
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(user: any) {
    const { id, title, order } = user;
    return { id, title, order };
  }
}

export default Column;
