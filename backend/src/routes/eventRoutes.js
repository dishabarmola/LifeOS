const express = require('express');

const {
    getEvents,
    postEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

// Event routes
router.get('/', getEvents);
router.post('/', postEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;