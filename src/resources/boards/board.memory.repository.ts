import Repository from '../Repository';
import Board from './board.model';

/**
 * @remarks
 * database with CRUD methods for the Board
 */
const boardsRepo= new Repository<Board>()

export { boardsRepo };
