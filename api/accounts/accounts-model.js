const db = require("../../data/db-config");

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db("accounts");
  return result;
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const [result] = await db("accounts").where("id", id);
  return result;
};

const create = async (account) => {
  // DO YOUR MAGIC
  let createdAccount = await db("accounts").insert(account);
  let result = await getById(createdAccount);
  return result;
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").update(account).where("id", id);
  let result = await getById(id);
  return result;
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deletedItem = await getById(id);
  await db("accounts").del().where("id", id);
  return deletedItem;
};

const getByName = async (name) => {
  const result = await db("accounts").where("name", name);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
