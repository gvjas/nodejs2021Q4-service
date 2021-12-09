import { v4 as uuid } from 'uuid';

class Column {
  constructor({
    id = uuid(),
    title = "TITLE",
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(user) {
    const { id, title, order } = user;
    return { id, title, order };
  }
}

export default Column;
