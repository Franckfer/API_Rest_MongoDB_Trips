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
    .put('/:tripID', async (req, res) => {
        
        try {

            const tripUpdate = await Trip.findByIdAndUpdate(
                req.params.tripID,
                req.body,
                { new: true }
            );

            res.json(tripUpdate);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'An error has occurred'
            }) 
        }
    })
    .delete('/:tripID', async (req, res) => {

        try {
            
            const tripDelete = await Trip.findByIdAndDelete(
                req.params.tripID
            );

            res.json(tripDelete);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'An error has occurred'
            }) 
        }
    })


module.exports = router;