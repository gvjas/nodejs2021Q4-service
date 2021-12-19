import { v4 as uuid } from 'uuid';

/**
 * class :: User
 * @remarks
 * user's administration properties and view this
 */
class User {
  /** required different instance uuid */
  id: string;
  /** required login for each User */
  login: string;
  /** required name for each User */
  name: string;
  /** required password for each User */
  private password: string;

  /**
   * @remarks
   * for new user inicializing properties:
   * @param id - uuid
   * @param name - user's name
   * @param login - user's name
   * @param password - user's password
   */
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

  /**
   * @remarks
   * displays some properties of the element whithout password
   * @param user - User's instance 
   * @returns object with id, name, login but hidden password
   */
  static toResponse(user: User): { id: string, name: string, login: string }  {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
