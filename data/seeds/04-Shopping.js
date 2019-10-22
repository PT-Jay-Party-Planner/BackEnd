exports.seed = function(knex, Promise) {
	return knex('shopping_list').del().then(function() {
		return knex('shopping_list').insert([
			{ id: 1, party_id: 1, item: 'balloons', purchased: false, price: 5 },
			{ id: 2, party_id: 1, item: 'drinks', purchased: false, price: 55 },
			{ id: 3, party_id: 1, item: 'cake', purchased: false, price: 20 },
			{ id: 4, party_id: 2, item: 'juice', purchased: false, price: 5 },
			{ id: 5, party_id: 2, item: 'cups', purchased: false, price: 10 },
			{ id: 6, party_id: 2, item: 'cookies', purchased: false, price: 15 },
			{ id: 7, party_id: 3, item: 'decorations', purchased: false, price: 25 },
			{ id: 8, party_id: 3, item: 'candy', purchased: false, price: 20 },
			{ id: 9, party_id: 3, item: 'music', purchased: false, price: 10 }
		]);
	});
};
