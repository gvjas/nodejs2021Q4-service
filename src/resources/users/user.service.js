const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const pushDB = (user) => usersRepo.pushDB(user);

const update = (user) => usersRepo.update(user);

const del = (id) => usersRepo.del(id);

module.exports = { getAll, pushDB, getById, update, del };
