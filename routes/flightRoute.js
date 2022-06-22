const express = require('express');
const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)

// Add/Book New flight    post Method
router.post('/bookFlight', controller.bookFlight)

// Get all Flights         get Method
router.get('/getAllFlights', controller.fetchAllFlights)

// Get Single Flights         get Method
router.get('/getSingleFlight/:id', controller.getSingleFlight)

//Update/Edit Flight        put Method
router.put('/updateFlight/:id', controller.updateSingleFlight)

//Delete Flight        delete Method
router.delete('/deleteFlight/:id', controller.deleteFlight)


module.exports = router;

