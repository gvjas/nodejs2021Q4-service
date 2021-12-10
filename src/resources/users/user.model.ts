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
