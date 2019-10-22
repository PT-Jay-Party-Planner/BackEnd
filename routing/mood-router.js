const router = require('express').Router();

const Mood = require('../data/models/mood-model');

// GET -> /mood
router.get('/', async (req, res) => {
	try {
		const mood = await Mood.find(req.id);
		res.status(200).json(mood);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET -> /mood/:id
router.get('/:id', async (req, res) => {
	const partyID = req.id;
	try {
		const mood = await Mood.findById(req.params.id);
		if (mood && `${item.party_id}` === partyID) {
			res.status(200).json(mood);
		} else {
			res.status(404).json({ message: 'Error: Mood item not found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST -> /mood
router.post('/', async (req, res) => {
	const partyID = req.params.id;
	try {
		const mood = await Mood.add(req.body);
		if (mood) {
			res.status(201).json(mood);
		} else {
			res.status(404).json({ message: 'Error: Mood item not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// PUT -> /mood/id
router.put('/:id', async (req, res) => {
	try {
		const mood = await Mood.update(req.params.id, req.body);
		if (mood) {
			res.status(200).json({ message: 'Mood item updated' });
		} else {
			res.status(404).json({ message: 'Error: Mood item could not be found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE -> /mood/id
router.delete('/:id', async (req, res) => {
	try {
		const count = await Mood.remove(req.params.id);
		if (count !== 0) {
			res.status(200).json({ message: 'Mood item deleted' });
		} else {
			res.status(404).json({ message: 'Error: Unable to find mood' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
