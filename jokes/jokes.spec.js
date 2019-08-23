const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('../api/server')

describe('test jokes', () => {

    const jokes = {
        id: 1,
        joke: "Im not funny cuz im a dad"
        
    }

    describe('get jokes', () => {
        it('id', () => {
            expect(jokes).toHaveProperty("id")
        })
        it('Joke', () => {
            expect(jokes).toHaveProperty("joke")
        })
    })
})