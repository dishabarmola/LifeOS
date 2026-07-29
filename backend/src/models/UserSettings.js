const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const userSettingsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID
        },

        userId: {
            type: String,
            ref: "User",
            required: true,
            unique: true
        },

        theme: {
            type: String,
            enum: [
                "light",
                "dark",
                "system"
            ],
            default: "system"
        },

        notifications: {
            email: {
                type: Boolean,
                default: true
            },

            eventReminders: {
                type: Boolean,
                default: true
            },

            academicDeadlines: {
                type: Boolean,
                default: true
            },

            weeklyReview: {
                type: Boolean,
                default: true
            }
        },

        newsPreferences: {
            topics: [
                {
                    type: String
                }
            ]
        },

        privacy: {
            profileVisible: {
                type: Boolean,
                default: false
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "UserSettings",
    userSettingsSchema,
    "userSettings"
);