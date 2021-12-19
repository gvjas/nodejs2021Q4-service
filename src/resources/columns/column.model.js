const uuid = require('uuid').v4;

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

module.exports = Column;
