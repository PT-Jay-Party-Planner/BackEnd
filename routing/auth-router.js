const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../auth/token.js');

const Users = require('../data/models/user-model.js');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			const { password, ...rest } = saved;
			res.status(201).json(rest);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	console.log(req.body);

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({
					username : user.username,
					userID   : user.id,
					token,
				});
			} else {
				res.status(401).json({ message: 'Error: Invalid Credentials' });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
});

module.exports = router;

