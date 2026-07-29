const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const academicSchema = new mongoose.Schema(
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

        subject: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            enum: [
                "assignment",
                "exam",
                "project",
                "study",
                "revision",
                "other"
            ],
            default: "study"
        },

        deadline: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "not-started",
                "in-progress",
                "completed"
            ],
            default: "not-started"
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

        resources: [
            {
                title: {
                    type: String
                },

                url: {
                    type: String
                }
            }
        ],

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
    "Academic",
    academicSchema,
    "academic"
);