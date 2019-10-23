const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
	const password = bcrypt.hashSync('1234', 10);
	return knex('users').del().then(function() {
		return knex('users').insert([
			{ username: 'Jay', password: password },
			{ username: 'Colby', password: password },
			{ username: 'Ryan', password: password },
			{ username: 'Michelle', password: password },
			{ username: 'Courtney', password: password },
			{ username: 'Pete', password: password },
			{ username: 'Tauan', password: password },
		]);
	});
};