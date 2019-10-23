const authRouter = require('../api/server');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('auth-router', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	afterEach(async () => {
		await db('users').truncate();
	});
	describe('POST /register endpoint', () => {
		it('returns the right response status', () => {
			const newUser = { username: 'test555', password: 'test' };
			return request(authRouter).post('/auth/register').send(newUser).then((res) => {
				expect(res.status).toBe(201);
			});
		});
	});
	describe('POST /login endpoint', () => {
		it('returns status 401 when trying to login an unregistered user', () => {
			const newUser = { username: 'testy', password: 'testy' };

			return request(authRouter).post('/auth/login').send(newUser).then((res) => {
				expect(res.status).toBe(401);
			});
		});
	});
});
