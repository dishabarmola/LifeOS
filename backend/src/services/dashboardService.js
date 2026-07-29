const Event = require("../models/Event");
const Plan = require("../models/Plan");
const Academic = require("../models/Academic");
const Health = require("../models/Health");
const News = require("../models/News");

const getCards = async (userId) => {

    const events = await Event.find({
        userId: userId
    })
    .sort({
        startDate: 1
    });

    const plans = await Plan.find({
        userId: userId
    })
    .sort({
        startDate: 1
    });

    const academics = await Academic.find({
        userId: userId
    })
    .sort({
        deadline: 1
    });

    const news = await News.find({
        userId: userId
    })
    .sort({
        date: -1
    });


    const cardResponse = [

        {
            type: "events",
            next: events.length > 0
                ? events[0].title
                : null,
            quantity: events.length
        },

        {
            type: "plans",
            next: plans.length > 0
                ? plans[0].title
                : null,
            quantity: plans.length
        },

        {
            type: "academics",
            next: academics.length > 0
                ? academics[0].title
                : null,
            quantity: academics.length
        },

        {
            type: "news",
            next: news.length > 0
                ? news[0].summary
                : null,
            quantity: news.length
        }

    ];


    return cardResponse;
};

const getCalendar = async (userId) => {

    const today = new Date();

    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
    );

    const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
    );

    const events = await Event.find({
        userId: userId,

        startDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    const plans = await Plan.find({
        userId: userId,

        startDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    const academics = await Academic.find({
        userId: userId,

        deadline: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    const health = await Health.findOne({
        userId: userId,

        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });


    const dashboardResponse = [];

    events.forEach((event) => {

        dashboardResponse.push({
            type: "events",
            title: event.title,
            description: event.description,
            time: event.startDate,
            priority: event.priority
        });

    });

    plans.forEach((plan) => {

        dashboardResponse.push({
            type: "plans",
            title: plan.title,
            description: plan.description,
            time: plan.startDate,
            priority: plan.priority
        });

    });

    academics.forEach((academic) => {

        dashboardResponse.push({
            type: "academics",
            title: academic.title,
            description: academic.description,
            time: academic.deadline,
            priority: academic.priority
        });

    });

    if (health) {

        dashboardResponse.push({

            type: "health",

            title: "Health",

            description:
                health.notes || "Health tracking for today",

            time: health.date,

            priority: "medium"

        });

    }


    return dashboardResponse;
};

const getEvents = async (userId) => {
    
    console.log("userId in getEvents:", userId); 
    const events = await Event.find({
        userId: userId
    })
    .sort({
        startDate: 1
    });


    const dashboardResponse = events.map((event) => {

        return {

            type: "events",

            title: event.title,

            description: event.description,

            date: event.startDate,

            priority: event.priority

        };

    });


    return dashboardResponse;
};

const getAcademics = async (userId) => {

    const academics = await Academic.find({
        userId: userId
    })
    .sort({
        deadline: 1
    });


    const dashboardResponse = academics.map((academic) => {

        return {

            type: "academics",

            title: academic.title,

            description: academic.description,

            date: academic.deadline,

            priority: academic.priority

        };

    });


    return dashboardResponse;
};



module.exports = {
    getCards,
    getCalendar,
    getEvents,
    getAcademics
};