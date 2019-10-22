exports.up = function(knex) {
	return knex.schema
		.createTable('users', function(users) {
			users.increments();
			users.string('username').notNullable().unique();
			users.string('password').notNullable();
		})
		.createTable('party', function(party) {
			party.increments();
			party.string('party_name').notNullable();
			party.integer('n_of_guests');
			party.date('date');
			party.string('theme');
			party.integer('budget');

			party.integer('user_id').unsigned().notNullable().references('id').inTable('users');
		})
		.createTable('mood_board', function(mood) {
			mood.increments();
			mood.string('url_picture').notNullable();

			mood.integer('party_id').unsigned().notNullable().references('id').inTable('party');
		})
		.createTable('shopping_list', function(shopping) {
			shopping.increments();
			shopping.string('item').notNullable();
			shopping.boolean('purchased').defaultTo(false);
			shopping.integer('price');

			shopping.integer('party_id').unsigned().notNullable().references('id').inTable('party');
		})
		.createTable('todo_list', function(todo) {
			todo.increments();
			todo.string('item').notNullable();
			todo.boolean('completed').defaultTo(false);

			todo.integer('party_id').unsigned().notNullable().references('id').inTable('party');
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('users')
		.dropTableIfExists('party')
		.dropTableIfExists('mood')
		.dropTableIfExists('shopping')
		.dropTableIfExists('todo');
};
