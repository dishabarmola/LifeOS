const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const planSchema = new mongoose.Schema(
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

        category: {
            type: String,
            enum: [
                "travel",
                "personal",
                "career",
                "finance",
                "learning",
                "other"
            ],
            default: "other"
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

        status: {
            type: String,
            enum: [
                "planned",
                "in-progress",
                "completed",
                "cancelled"
            ],
            default: "planned"
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

        tags: [
            {
                type: String
            }
        ],

        budget: {
            type: Number,
            default: 0
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
    "Plan",
    planSchema,
    "plans"
);