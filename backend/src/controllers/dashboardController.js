const dashboardService = require("../services/dashboardService");


const getUserId = (req) => req.user.userId;

const getCards = async (req, res) => {
    try {
        const userId = getUserId(req);
        const data = await dashboardService.getCards(userId);

        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error(
            "Error fetching dashboard cards:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard cards"
        });
    }
};


const getCalendar = async (req, res) => {
    try {
        const userId = getUserId(req);
        const data = await dashboardService.getCalendar(userId);

        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error(
            "Error fetching calendar:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch calendar"
        });
    }
};


const getEvents = async (req, res) => {
    try {

        const userId = getUserId(req);
        const data = await dashboardService.getEvents(userId);
        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error(
            "Error fetching dashboard events:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch events"
        });
    }
};


const getAcademics = async (req, res) => {
    try {
        const userId = getUserId(req);
        const data = await dashboardService.getAcademics(userId);

        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error(
            "Error fetching dashboard academics:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch academics"
        });
    }
};


module.exports = {
    getCards,
    getCalendar,
    getEvents,
    getAcademics
};