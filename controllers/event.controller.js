const Event = require('../models/Event');
const { validationResult } = require('express-validator');
class EventController {

    async getEventDay(req, res) {

        try {
            const { loc, lang, date } = req.query;
            console.log(loc, lang, date);

            res.status(200).json(
                await Event.getEventOfTheDay(loc, lang, date)
            );
            return
        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
    async getSearch(req, res) {
        try {
            const { q, loc, lang } = req.query;
            const validator = validationResult(req);
            if (validator.isEmpty()) {
                res.status(200).json(
                    await Event.onlineSearch(q, loc, lang)
                );
                return;
            }
            res.status(400).json({ error: validator.errors.shift() })


        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }

    }
    async getInfo(req, res) {
        try {
            const { id, lang } = req.query;
            const validator = validationResult(req);
            console.log(id);
            if (validator.isEmpty()) {
                res.status(200).json(
                    await Event.getEventInfo(id, lang)
                );
                return;

            }
            res.status(400).json({ error: validator.errors.shift() })

        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }

    }
    async getPlace(req, res) {
        try {
            const { id, lang } = req.query;
            const validator = validationResult(req);
            if (validator.isEmpty()) {
                res.status(200).json(
                    await Event.getPlaceInfo(id, lang)
                );
                return;
            }
            res.status(400).json({ error: validator.errors.shift() })
        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }

    }

}

module.exports = new EventController();