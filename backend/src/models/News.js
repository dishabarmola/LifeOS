const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const newsSchema = new mongoose.Schema(
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

        topics: [
            {
                type: String
            }
        ],

        articles: [
            {
                title: {
                    type: String
                },

                url: {
                    type: String
                },

                source: {
                    type: String
                },

                publishedAt: {
                    type: Date
                },

                summary: {
                    type: String
                }
            }
        ],

        summary: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "News",
    newsSchema,
    "news"
);