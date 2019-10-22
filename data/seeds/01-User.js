const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
	const password = bcrypt.hashSync('1234', 10);
	return knex('users').del().then(function() {
		return knex('users').insert([
			{ id: 1, username: 'Ian', password: password },
			{ id: 2, username: 'Elisa', password: password },
			{ id: 3, username: 'Josh', password: password }
		]);
	});
};