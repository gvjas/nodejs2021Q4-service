let db = []

const getAll = async (boardId) => db.filter( (t) => t.boardId === boardId);

const delAll = async (boardId) => {
  db = db.filter( (t) => t.boardId !== boardId)
};

const getById = async (id) => db.find( (t) => t.id === id)

const pushDB = async (task) => {
  await db.push(task)
  return task;
};

const update = async (task)=> {
  const {id} = task
  const index = await db.findIndex((t) => t.id === id)
  db[index] = { ...task}
  return db[index]
}


const setUserNull = async (userId) => {
  await db.forEach((t) => { if (t.userId === userId) t.setUserId(null) } )
}

const del = async (id) => {
  db = db.filter((u) => u.id !== id)
}

module.exports = { getAll, pushDB, getById, update, del, delAll, setUserNull };

