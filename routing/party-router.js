const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Parties = require('../data/models/party-model');

// GET -> /parties
router.get('/', async (req, res) => {
	try {
		const parties = await Parties.find();
		res.status(200).json(parties);
		console.log(req.query);
		console.log(req.params);
		console.log(req.sessions);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET -> /parties/id
router.get('/:id', async (req, res) => {
	try {
		const party = await Parties.findById(req.params.id);
		if (party) {
			res.status(200).json(party);
		} else {
			res.status(404).json({ message: 'Error: Party not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: `${error}` });
	}
});

// POST -> /parties
router.post('/', async (req, res) => {
	try {
		const party = await Parties.add(req.body);
		res.status(201).json(party);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}); //

//PUT -> /parties/id
router.put('/:id', async (req, res) => {
	try {
		const party = await Parties.update(req.params.id, req.body);
		if (party) {
			res.status(200).json({ message: 'Party Updated' });
		} else {
			res.status(404).json({ message: 'Error: Party could not be found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE -> /parties/id
router.delete('/:id', async (req, res) => {
	try {
		const count = await Parties.remove(req.params.id);
		if (count !== 0) {
			res.status(200).json({ message: 'Party Deleted' });
		} else {
			res.status(404).json({ message: 'Error: Unable to find party' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
}); ///

module.exports = router;
