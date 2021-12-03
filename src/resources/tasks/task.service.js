const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const delAll = (boardId) => tasksRepo.delAll(boardId);

const getById = (id) => tasksRepo.getById(id);

const pushDB = (task) => tasksRepo.pushDB(task);

const update = (task) => tasksRepo.update(task);

const del = (id) => tasksRepo.del(id);

const setUserNull = (userId) => tasksRepo.setUserNull(userId);

module.exports = { getAll, pushDB, getById, update, del, delAll, setUserNull };
