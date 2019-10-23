exports.seed = function(knex, Promise) {
	return knex('todo_list').del().then(function() {
		return knex('todo_list').insert([
			{ id: 1, party_id: 1, item: 'Rent costumes', completed: false },
			{ id: 2, party_id: 1, item: 'Buy decorations', completed: false },
			{ id: 3, party_id: 2, item: 'Finish DIYs', completed: false },
			{ id: 4, party_id: 2, item: 'Clean up', completed: false },
			{ id: 5, party_id: 2, item: 'Send invites', completed: false }
		]);
	});
};
