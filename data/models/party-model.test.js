const db = require('../dbConfig.js');
const Party = require('./party-model.js');

describe('Party Model', () => {
	beforeEach(async () => {
		await db('party').truncate();
	});

	afterEach(async () => {
		await db('party').truncate();
	});

	describe('add', () => {
		it('add party into database', async () => {
			const newParty = await Party.add({ user_id: 1, party_name: 'B-day' });
			expect(newParty.party_name).toBe('B-day');
		});
		it('adding 2 parties to the database', async () => {
			const newParty1 = await Party.add({ user_id: 1, party_name: 'B-day' });
			const newParty2 = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const allOfThem = await db('party');
			expect(allOfThem).toHaveLength(2);
		});
	});

	describe('find', () => {
		it('find party in database', async () => {
			const newParty = await Party.add({ user_id: 1, party_name: 'B-day' });
			const findParty = await Party.find();
			expect(findParty).toEqual([
				{
					budget: null,
					date: null,
					id: 1,
					n_of_guests: null,
					party_name: 'B-day',
					theme: null,
					user_id: 1
				}
			]);
		});
		it('find 2 parties after adding them to the database', async () => {
			const newParty1 = await Party.add({ user_id: 1, party_name: 'B-day' });
			const newParty2 = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const findParty = await Party.find();
			expect(findParty).toEqual([
				{
					budget: null,
					date: null,
					id: 1,
					n_of_guests: null,
					party_name: 'B-day',
					theme: null,
					user_id: 1
				},
				{
					budget: null,
					date: null,
					id: 2,
					n_of_guests: null,
					party_name: 'X-mas',
					theme: null,
					user_id: 1
				}
			]);
		});
	});

	describe('findById', () => {
		it('find by party id one party in a database with 2 parties', async () => {
			const newParty1 = await Party.add({ user_id: 1, party_name: 'B-day' });
			const newParty2 = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const findParty = await Party.findById(1);
			expect(findParty).toEqual({
				budget: null,
				date: null,
				id: 1,
				n_of_guests: null,
				party_name: 'B-day',
				theme: null,
				user_id: 1
			});
		});
		it('find by party id a different party in a database with 2 parties', async () => {
			const newParty1 = await Party.add({ user_id: 1, party_name: 'B-day' });
			const newParty2 = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const findParty = await Party.findById(2);
			expect(findParty).toEqual({
				budget: null,
				date: null,
				id: 2,
				n_of_guests: null,
				party_name: 'X-mas',
				theme: null,
				user_id: 1
			});
		});
	});

	describe('remove', () => {
		it('removes party correctly', async () => {
			const partyOne = await Party.add({ user_id: 1, party_name: 'B-day' });
			const removeparty = await Party.remove(1);

			const allOfThem = await db('party');
			expect(allOfThem).toHaveLength(0);
		});
		it('removes party correctly when adding more than one', async () => {
			const partyOne = await Party.add({ user_id: 1, party_name: 'B-day' });
			const partyTwo = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const partyThree = await Party.add({ user_id: 1, party_name: 'party party' });
			const removeparty = await Party.remove(1);

			const allOfThem = await db('party');
			expect(allOfThem).toHaveLength(2);
		});
	});

	describe('update', () => {
		it('update 1 party in database', async () => {
			const newParty1 = await Party.add({ user_id: 1, party_name: 'B-day' });
			const newParty2 = await Party.add({ user_id: 1, party_name: 'X-mas' });
			const updateParty = await Party.update(1, {
				budget: 500,
				date: null,
				id: 1,
				n_of_guests: 20,
				party_name: 'B-day',
				theme: 'Golden',
				user_id: 1
			});
			const findParty = await Party.findById(1);
			expect(findParty).toEqual({
				budget: 500,
				date: null,
				id: 1,
				n_of_guests: 20,
				party_name: 'B-day',
				theme: 'Golden',
				user_id: 1
			});
		});
	});
});
//
