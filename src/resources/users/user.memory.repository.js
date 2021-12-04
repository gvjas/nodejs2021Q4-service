let db = []

const getAll = async () => db;

const getById = async (id) => db.find((u) => u.id === id);

const pushDB = async (user) => {
  await db.push(user)
  return user;
};

const update = async (user)=> {
  const {id} = user
  const indexUser = await db.findIndex((u) => u.id === id)
  db[indexUser] = { ...user}
  return db[indexUser]
}

const del = async (id) => {
  db = db.filter((u) => u.id !== id)
  
}


module.exports = { getAll, pushDB, getById, update, del };
