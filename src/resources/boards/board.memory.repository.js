let db = []

const getAll = async () => db;

const getById = async (id) => db.find( (u) => u.id === id);

const pushDB = async (board) => {
  await db.push(board)
  return board;
};

const update = async (board)=> {
  const {id} = board
  const indexUser = await db.findIndex((u) => u.id === id)
  db[indexUser] = { ...board}
  return db[indexUser]
}

const del = async (id) => {
  db = db.filter((u) => u.id !== id)
  
}

module.exports = { getAll, pushDB, getById, update, del };
