const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const healthSchema = new mongoose.Schema(
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

        date: {
            type: Date,
            required: true
        },

        weight: {
            type: Number
        },

        sleep: {
            hours: {
                type: Number
            },

            quality: {
                type: String,
                enum: [
                    "poor",
                    "average",
                    "good",
                    "excellent"
                ]
            }
        },

        water: {
            type: Number
        },

        energyLevel: {
            type: Number,
            min: 1,
            max: 10
        },

        mood: {
            type: String,
            enum: [
                "very-bad",
                "bad",
                "neutral",
                "good",
                "excellent"
            ]
        },

        exercise: {
            completed: {
                type: Boolean,
                default: false
            },

            type: {
                type: String
            },

            duration: {
                type: Number
            }
        },

        diet: {
            breakfast: String,
            lunch: String,
            dinner: String,
            snacks: String
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

healthSchema.index(
    {
        userId: 1,
        date: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "Health",
    healthSchema,
    "health"
);