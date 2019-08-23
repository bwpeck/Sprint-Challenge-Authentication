const request = require('supertest'); // calling it "request" is a common practice
const db = require('../database/dbConfig');
const server = require('./server');

describe('users model', () => {
	// http calls made with supertest return promises, we can use async/await if desired
	beforeEach(async () => {
		await db('users').truncate();
	});

	const user = {
		id       : 1,
        username : 'pandapanda',
        password : 'eucaliptis'
	};

	describe('register', () => {
		it('!Empty User', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('user !== null', () => {
			expect(user).not.toBeNull();
		});

		it('add user to database', async () => {
			await request(server).post('/api/auth/register').send({
                username : 'pandapanda',
                password : 'eucaliptis'
			});
			const users = await db('users');
			expect(users).toHaveLength(1);
		});
    });
	describe('login', () => {
		const user =  {
            username: "pandapanda",
            password: "eucaliptis"
        }

		it('test1', () => {
			expect(user).toHaveProperty("username");
		});
		it('test2', () => {
			expect(user).not.toBeNull();
        });
        it('test3', () => {
			expect(user).toHaveProperty("password");
		});
	
	});
});