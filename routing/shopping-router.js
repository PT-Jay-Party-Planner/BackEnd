const router = require('express').Router();

const Shopping = require('../data/models/shopping-model.js');

// GET -> /parties/:id/shopping
router.get('/', async (req, res) => {
	try {
    const list = await Shopping.find(req.id);
    console.log('PARMS: ', req.id);
		res.status(200).json(list);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET -> /parties/:id/shopping/:id
router.get('/:id', async (req, res) => {
  const partyID = req.id;
  try {
    const item = await Shopping.findById(req.params.id);
    item && `${item.party_id}` === partyID
      ? res.status(200).json(item)
      : res.status(404).json({ message: 'Error: Item not found' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: `${error}` });
  }
});

// POST -> /parties/:id/shopping
router.post('/', async (req, res) => {
  const partyID = req.params.id;
	try {
    const item = await Shopping.add(req.body);
    item && `${item.party_id}` === partyID
      ? res.status(201).json(item)
      : res.status(403).json({ message: 'Denied: Invalid Item' });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// PUT -> /parties/:id/shopping/:id
router.put('/:id', async (req, res) => {
  if (req.id != req.body.party_id) {
    res.status(400).json({ message: 'Denied: Party Does Not Match `party_id`' })
  } else {
    try {
      const item = await Shopping.update(req.params.id, req.body);
      item
        ? res.status(200).json(item)
        : res.status(400).json({ message: 'Bad Request' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// DELETE -> /parties/:id/shopping/:id
router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
	try {
		const count = await Shopping.remove(req.params.id);
		if (count !== 0) {
			res.status(200).json({ message: 'Item deleted' });
		} else {
			res.status(404).json({ message: 'Error: Item does not exist' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;