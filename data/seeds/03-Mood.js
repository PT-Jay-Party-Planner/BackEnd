exports.seed = function(knex, Promise) {
	return knex('mood_board').del().then(function() {
		return knex('mood_board').insert([
			{ id: 1, party_id: 1, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 2, party_id: 1, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 3, party_id: 1, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 4, party_id: 2, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 5, party_id: 2, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 6, party_id: 2, url_picture: 'https://bit.ly/2v6wGOh' },
			{ id: 7, party_id: 3, url_picture: 'https://bit.ly/2GixlRP' },
			{ id: 8, party_id: 3, url_picture: 'https://bit.ly/2DgFntV' },
			{ id: 9, party_id: 3, url_picture: 'https://bit.ly/2v6wGOh' }
		]);
	});
};
