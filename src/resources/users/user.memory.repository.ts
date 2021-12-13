import Repository from '../Repository';
import User from './user.model';

/**
 * @remarks
 * database with CRUD methods for the User
 */
const usersRepo = new Repository<User>()

export { usersRepo };
