// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import { v4 as uuid } from 'uuid';

class User {
  id: any;
  login: any;
  name: any;
  password: any;
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: any) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
