exports.seed = function(knex, Promise) {
	return knex('party').del().then(function() {
		return knex('party').insert([
			{
				id: 1,
				user_id: 1,
				party_name: 'Ken B-day',
				n_of_guests: 50,
				date: '2019-10-07',
				theme: '80s',
				budget: 500
			},
			{
				id: 2,
				user_id: 2,
				party_name: 'Office party',
				n_of_guests: 150,
				date: '2019-12-20',
				theme: 'X-mas',
				budget: 2300
			},
			{
				id: 3,
				user_id: 3,
				party_name: 'Halloween Party',
				n_of_guests: 90,
				date: '2019-10-31',
				theme: 'Zombies',
				budget: 90
			}
		]);
	});
};
