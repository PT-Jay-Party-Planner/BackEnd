const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routing/user-router');
const authRouter = require('../routing/auth-router');
const partyRouter = require('../routing/party-router');
const shoppingRouter = require('../routing/shopping-router');
const todoRouter = require('../routing/todo-router');
const restricted = require('../auth/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/users', userRouter);
server.use('/auth', authRouter);
server.use('/parties', restricted, partyRouter);
server.use(
	'/parties/:id/shopping/',
	restricted,
	(req, res, next) => {
		req.id = req.params.id;
		next();
	},
	shoppingRouter,
);
server.use(
	'/parties/:id/todo/',
	restricted,
	(req, res, next) => {
		req.id = req.params.id;
		next();
	},
	todoRouter,
);

server.get('/', (req, res) => {
	res.send('Alive!');
});

module.exports = server;
