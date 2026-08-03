const eventService = require('../services/eventService');

const getUserId = (req) => req.user.userId;

const getEvents = async (req, res) => {
    try {
        const userId = getUserId(req);
        const events = await eventService.getEvents(userId);

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch events"
        });
    }
};

const postEvent = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { title, description, startDate, endDate, priority } = req.body;
        await eventService.createEvent(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Event created successfully"
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({
            success: false,
            message: "Failed to create event"
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const userId = getUserId(req);
        const eventId = req.params.id;
        await eventService.updateEvent(userId, eventId, req.body);
        res.status(200).json({
            success: true,
            message: "Event updated successfully"
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update event"
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const userId = getUserId(req);
        const eventId = req.params.id;
        await eventService.deleteEvent(userId, eventId);
        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete event"
        });
    }
};

module.exports = {
    getEvents,
    postEvent,
    updateEvent,
    deleteEvent
};