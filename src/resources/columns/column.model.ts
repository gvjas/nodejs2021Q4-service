// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
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
