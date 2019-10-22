const server = require('../api/server');
const request = require('supertest');
const db = require('../data/dbConfig.js');

const validUser = {
	username: 'Ian',
	password: '1234'
};

describe('party-router', () => {
	beforeEach(async () => {
		await db('party').truncate();
	});

	afterEach(async () => {
		await db('party').truncate();
	});

	describe('Server is working', () => {
		it('Alive!', () => {
			const expectedResponseBody = 'Alive!';
			return request(server)
				.get('/')
				.expect(expectedResponseBody)
				.expect('Content-Length', expectedResponseBody.length.toString());
		});
	});

	describe('GET /parties endpoint', () => {
		it('get 400 without token', () => {
			return request(server).get('/parties').expect(400);
		});
		it('get 400 without token', async () => {
			// const registerUser = await request(server).post('/auth/register').send(validUser);

			const loginUser = await request(server).post('/auth/login').send(validUser);
			console.log(loginUser);
			return await request(server)
				.get('/parties')
				.set('Authorization', /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
				.expect(200);
		});
	});

	describe('GET /parties/:id endpoint', () => {
		it('gets 400 without token', () => {
			return request(server).get('/parties').expect(400);
		});
	});

	describe('POST /parties endpoint', () => {
		it('gets 400 without token', () => {
			return request(server).post('/parties').expect(400);
		});
	});

	describe('PUT /parties endpoint', () => {
		it('gets 400 without token', () => {
			return request(server).put('/parties').expect(400);
		});
	});

	describe('DELETE /parties endpoint', () => {
		it('gets 400 without token', () => {
			return request(server).delete('/parties').expect(400);
		});
	});
});
