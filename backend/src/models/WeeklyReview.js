const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const weeklyReviewSchema = new mongoose.Schema(
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

        weekStart: {
            type: Date,
            required: true
        },

        weekEnd: {
            type: Date,
            required: true
        },

        summary: {
            type: String,
            default: ""
        },

        highlights: [
            {
                type: String
            }
        ],

        improvements: [
            {
                type: String
            }
        ],

        recommendations: [
            {
                type: String
            }
        ],

        stats: {
            plansCompleted: {
                type: Number,
                default: 0
            },

            eventsCompleted: {
                type: Number,
                default: 0
            },

            academicTasksCompleted: {
                type: Number,
                default: 0
            },

            exerciseDays: {
                type: Number,
                default: 0
            },

            averageSleep: {
                type: Number,
                default: 0
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "WeeklyReview",
    weeklyReviewSchema,
    "weeklyReviews"
);