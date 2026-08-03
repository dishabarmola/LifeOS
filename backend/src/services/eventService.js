const Event = require('../models/Event');

const getEvents = async (userId) => {
    try {
        const events = await Event.find({ userId }).sort({ startDate: 1 });
        return events;
    } catch (error) {
        console.error('Error fetching events from database:', error);
        throw new Error('Failed to fetch events');
    }
};

const createEvent = async (userId, eventData) => {
    try {
        const newEvent = new Event({
            userId,
            ...eventData
        });

        if (!newEvent.startDate) {
            throw new Error('startDate is required');
        }

        return await newEvent.save();
    } catch (error) {
        console.error('Error creating event in database:', error);
        throw new Error('Failed to create event');
    }
};

const updateEvent = async (userId, eventId, updateData) => {
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            throw new Error('Event not found');
        }

        return updatedEvent;
    } catch (error) {
        console.error('Error updating event in database:', error);
        throw new Error('Failed to update event');
    }
};

const deleteEvent = async (userId, eventId) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ _id: eventId, userId });

        if (!deletedEvent) {
            throw new Error('Event not found');
        }

        return deletedEvent;
    } catch (error) {
        console.error('Error deleting event from database:', error);
        throw new Error('Failed to delete event');
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};