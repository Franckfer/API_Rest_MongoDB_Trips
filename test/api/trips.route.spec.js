const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');



describe('travel API tests', () => {

    // connection DB
    beforeAll( async () => {
        await mongoose.connect('mongodb://127.0.0.1/familyTrips')
    });
    
    // disconnection
    afterAll( async () => {
        await mongoose.disconnect()
    })

    describe('GET /api/trips', () => {

        let response;
        beforeEach( async () => {
            response = await request(app).get('/api/trips').send();
        })

        it('It should respond with a 200 status code', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('The request it should return an array of trips', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })

    })

})