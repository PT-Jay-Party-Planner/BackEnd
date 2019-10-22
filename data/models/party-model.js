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
	return db('party');
}

function findBy(filter) {
    
	return db('party').where(filter);
}

async function findByUserId(id) {
    return db('party').where('user_id', id)
}

async function add(party) {
	const [ id ] = await db('party').insert(party, 'id');

	return findById(id);
}

function findById(id) {
	return db('party').where({ id }).first();
}

function remove(id) {
	return db('party').where({ id }).del();
}

function update(id, changes) {
	return db('party').where({ id }).update(changes, '*');
}
