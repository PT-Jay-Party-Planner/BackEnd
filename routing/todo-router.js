const router = require('express').Router();

const Todo = require('../data/models/todo-model');

// GET -> /todo
router.get('/', async (req, res) => {
	try {
		const todo = await Todo.find(req.id);
		res.status(200).json(todo);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET -> /todo/:id
router.get('/:id', async (req, res) => {
	const partyID = req.id;
	try {
		const todo = await Todo.findById(req.params.id);
		if (todo && `${item.party_id}` === partyID) {
			res.status(200).json(todo);
		} else {
			res.status(404).json({ message: 'Error: To do item not found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST -> /todo
router.post('/', async (req, res) => {
	const partyID = req.id;
	try {
		const todo = await Todo.add(req.body);
		if (todo) {
			res.status(201).json(todo);
		} else {
			res.status(404).json({ message: 'Error: To do item not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// PUT -> /todo/id
router.put('/:id', async (req, res) => {
	try {
		const todo = await Todo.update(req.params.id, req.body);
		if (todo) {
			res.status(200).json({ message: 'To do item updated' });
		} else {
			res.status(404).json({ message: 'Error: To do item could not be found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE -> /todo/id
router.delete('/:id', async (req, res) => {
	try {
		const count = await Todo.remove(req.params.id);
		if (count !== 0) {
			res.status(200).json({ message: 'To do item deleted' });
		} else {
			res.status(404).json({ message: 'Error: Unable to find to do' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
