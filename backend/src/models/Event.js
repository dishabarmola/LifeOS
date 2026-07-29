const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const eventSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID
        },

        userId: {
            type: String,
            ref: "User",
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            enum: [
                "personal",
                "work",
                "academic",
                "health",
                "government",
                "other"
            ],
            default: "personal"
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date
        },

        location: {
            type: String,
            default: ""
        },

        priority: {
            type: String,
            enum: [
                "low",
                "medium",
                "high"
            ],
            default: "medium"
        },

        status: {
            type: String,
            enum: [
                "upcoming",
                "completed",
                "cancelled"
            ],
            default: "upcoming"
        },

        reminder: {
            type: Boolean,
            default: false
        },

        reminderTime: {
            type: Date
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Event",
    eventSchema,
    "events"
);