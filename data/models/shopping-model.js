const db = require('../dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update
};

function find(id) {
  const party_id = id;
  return db('shopping_list')
    .where({ party_id });
}

function findBy(filter) {
	return db('shopping_list').where(filter);
}

async function add(item) {
	const [ id ] = await db('shopping_list').insert(item, 'id');

	return findById(id);
}

function findById(id) {
	return db('shopping_list').where({ id }).first();
}

function remove(id) {
	return db('shopping_list').where({ id }).del();
}

function update(id, changes) {
	return db('shopping_list').where({ id }).update(changes);
}
