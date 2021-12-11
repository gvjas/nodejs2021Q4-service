import { v4 as uuid } from 'uuid';

class User {
  id: string;

  login: string;

  name: string;

  password: string;

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

  static toResponse(user: User): { id: string, name: string, login: string }  {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
