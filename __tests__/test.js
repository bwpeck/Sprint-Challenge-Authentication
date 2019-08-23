const request = require("supertest");

const db = require("../database/dbConfig");

const server = require("../api/server.js");

describe("HTTP Request Tests", () => {
    beforeEach(async () => {
        await db("users").truncate();
    });

    it("tests are running with DB_ENV set to 'testing'", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
    describe("GET /", () => {
        it("returns a 200 OK message", () => {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
    describe("get joke", () => {
        it('jokes', () => {
            return request(server)
                .get('/api/jokes/')

                .then(res => {
                    expect(res.type).toMatch(/json/);
                });
        });
    })
})
describe('POST register', () => {
    it('should post a new blog and return a status code of 404', () => {
        return request(server)
            .post('/api/auth/register')
            .send({ blog_summary: 'Todays been long!' })
            .then(response => {
                expect(response).toHaveProperty('status', 404);
            });
    });
    it('register', () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'Todays been long!' })
            .send({ password: "oogyboogyooh" })
            .then(response => {
                expect(response).toHaveProperty('status', 201);
            });
    });
});
describe('POST Login', () => {
    it('should post a new blog and return a status code of 500', () => {
        return request(server)
            .post('/api/auth/login')
            .send({ blog_summary: 'Todays been long!' })
            .then(response => {
                expect(response).toHaveProperty('status', 500);
            });
    });
    it('LOGIN', () => {
        return request(server)
            .post('/api/auth/login')
            .send({ username: 'Todays been long!', password: "oogyboogyooh" })
            .then(res => {
                expect(res.type).toMatch(/json/);
            });
    });
})