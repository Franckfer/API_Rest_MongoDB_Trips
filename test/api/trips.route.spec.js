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


    /* TEST GET */
    describe('GET /api/trips', () => {
        
        // before each test we make a request
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
    

    /* TEST POST */
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
        
    });
    
    /* TEST PUT */
    describe('PUT /api/trips/tripID', () => {
        
        // test model created
        let trip;
        beforeEach( async () => {
            trip = await Trip.create({
                name:'test trip',
                destination:'test trip',
                category:'familiar',
                start_date:'2022-04-19',
            })
        })
        
        // delete the test model from the database
        afterEach( async () => {
            await Trip.findByIdAndDelete(trip._id)
        })

        //before each test we make a request
        let response;
        beforeEach( async () => {
            response = await request(app).put(`/api/trips/${trip._id}`).send({
                name:'test trip updated'
            });
        })

        
        it('It should respond with a 200 status code in json format', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        
        it('It should be updated correctly by the PUT method', async () => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('test trip updated');
        })
        
    });
    
    
    /* TEST DELETE */
    describe('DELETE /api/trips/tripID', () => {
        
        let trip;
        let response;
        beforeEach( async () => {
            trip = await Trip.create({
                name:'test trip',
                destination:'test trip',
                category:'business',
                start_date:'2022-04-19',
            })
            response = await request(app).delete(`/api/trips/${trip._id}`).send()
        });


        it('It should respond with a 200 status code in json format', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })

        it('It should be removed correctly by the DELETE method', async () => {
            expect(response.body._id).toBeDefined();

            const foundTrip = await Trip.findById(trip._id);
            expect(foundTrip).toBeNull()
        })
    })
    
})