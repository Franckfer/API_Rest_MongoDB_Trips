const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Trip = require('../../models/Trip');




describe('travel API tests', () => {

    // connection DB
    beforeAll( async () => {
        await mongoose.connect('mongodb://127.0.0.1/familyTrips')
    });
    
    // disconnection
    afterAll( async () => {
        await mongoose.disconnect()
    });

    describe('GET /api/trips', () => {

        let response;
        beforeEach( async () => {
            response = await request(app).get('/api/trips').send();
        })

        it('It should respond with a 200 status code in json format', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('The request it should return an array of trips', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })

    });

    describe('POST /api/trips', () => {

        // test model
        const newTrip = {
            name:'test trip',
            destination:'test trip',
            category:'familiar',
            start_date:'2022-04-18',
        };

        // wrong model
        const wrongTrip = {nombre: 1};

        // delete the test model from the database
        afterAll( async () => {
            await Trip.deleteMany({
                name: 'test trip'
            })
        })


        it('It should respond with a 200 status code in json format', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })

        it('It should be sent correctly by the POST method', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.body._id).toBeDefined(); // Espera que tenga un id definido
            expect(response.body.name).toBe(newTrip.name); // Espera que el name recibido por el body sea igual al name del objeto newTrip
        })

        it('It should return an error with a 500 status code', async () => {
            const response = await request(app).post('/api/trips').send(wrongTrip);

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined(); 
        })
        
    })

})