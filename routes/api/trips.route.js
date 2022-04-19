const router = require('express').Router();
const Trip = require('../../models/Trip');


router
    .get('/', async (req, res) => {

        try {

            const trips = await Trip.find();
            res.json(trips)

        } catch (error) {

            console.log(error);
            res.status(500).json({
                error: 'An error has occurred'
            })
        }

    })
    .post('/', async (req, res) => {
      
        try {

            const newTrip = await Trip.create(req.body);
            res.json(newTrip);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'An error has occurred'
            })  
        }
    })


module.exports = router;