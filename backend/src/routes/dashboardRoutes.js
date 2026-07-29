const express = require("express");

const {
    getCards,
    getCalendar,
    getEvents,
    getAcademics
} = require("../controllers/dashboardController");

const router = express.Router();


// Dashboard cards
router.get("/cards", getCards);


// Dashboard calendar
router.get("/calendar", getCalendar);


// Dashboard events
router.get("/events", getEvents);


// Dashboard academics
router.get("/academics", getAcademics);


module.exports = router;