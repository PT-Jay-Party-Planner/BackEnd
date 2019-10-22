const db = require('../dbConfig.js');
const Todo = require('./todo-model.js');

describe('To do List Model', () => {
	beforeEach(async () => {
		await db('todo_list').truncate();
	});

	afterEach(async () => {
		await db('todo_list').truncate();
	});

	describe('add', () => {
		it('add todo into database', async () => {
			const newtodo = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			expect(newtodo.item).toBe('rent venue');
		});
		it('adding 2 parties to the database', async () => {
			const newtodo1 = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const newtodo2 = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const allOfThem = await db('todo_list');
			expect(allOfThem).toHaveLength(2);
		});
	});

	describe('find', () => {
		it('find todo in database', async () => {
			const newtodo = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const findtodo = await Todo.find(1);
			expect(findtodo).toEqual([
				{
					id: 1,
					item: 'rent venue',
					party_id: 1,
					completed: 0
				}
			]);
		});
		it('find 2 parties after adding them to the database', async () => {
			const newtodo1 = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const newtodo2 = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const findtodo = await Todo.find(1);
			expect(findtodo).toEqual([
				{
					id: 1,
					item: 'rent venue',
					party_id: 1,
					completed: 0
				},
				{
					id: 2,
					item: 'do shopping',
					party_id: 1,
					completed: 0
				}
			]);
		});
	});

	describe('findById', () => {
		it('find by todo id one todo in a database with 2 parties', async () => {
			const newtodo1 = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const newtodo2 = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const findtodo = await Todo.findById(1);
			expect(findtodo).toEqual({
				id: 1,
				item: 'rent venue',
				party_id: 1,
				completed: 0
			});
		});
		it('find by todo id a different todo in a database with 2 parties', async () => {
			const newtodo1 = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const newtodo2 = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const findtodo = await Todo.findById(2);
			expect(findtodo).toEqual({
				id: 2,
				item: 'do shopping',
				party_id: 1,
				completed: 0
			});
		});
	});

	describe('remove', () => {
		it('removes todo correctly', async () => {
			const todoOne = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const removetodo = await Todo.remove(1);

			const allOfThem = await db('todo_list');
			expect(allOfThem).toHaveLength(0);
		});
		it('removes todo correctly when adding more than one', async () => {
			const todoOne = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const todoTwo = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const todoThree = await Todo.add({ party_id: 1, item: 'todo todo', completed: false });
			const removetodo = await Todo.remove(1);

			const allOfThem = await db('todo_list');
			expect(allOfThem).toHaveLength(2);
		});
	});

	describe('update', () => {
		it('update 1 todo in database', async () => {
			const newtodo1 = await Todo.add({ party_id: 1, item: 'rent venue', completed: false });
			const newtodo2 = await Todo.add({ party_id: 1, item: 'do shopping', completed: false });
			const updatetodo = await Todo.update(1, {
				id: 1,
				item: 'rent venue',
				party_id: 1,
				completed: true
			});
			const findtodo = await Todo.findById(1);
			expect(findtodo).toEqual({
				id: 1,
				item: 'rent venue',
				party_id: 1,
				completed: 1
			});
		});
	});
});
