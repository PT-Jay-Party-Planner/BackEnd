const db = require('../dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
    update,
    findByUserId
};

function find() {
	return db('mood');
}

function findBy(filter) {
    
	return db('mood').where(filter);
}

async function findByUserId(id) {
    return db('mood').where('user_id', id)
}

async function add(party) {
	const [ id ] = await db('mood').insert(party, 'id');

	return findById(id);
}

function findById(id) {
	return db('mood').where({ id }).first();
}

function remove(id) {
	return db('mood').where({ id }).del();
}

function update(id, changes) {
	return db('mood').where({ id }).update(changes, '*');
}
