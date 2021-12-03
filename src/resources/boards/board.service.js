const boardsRepo = require('./board.memory.repository');


const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const pushDB = (board) => boardsRepo.pushDB(board);

const update = (board) => boardsRepo.update(board);

const del = (id) => boardsRepo.del(id);


module.exports = { getAll, pushDB, getById, update, del };
