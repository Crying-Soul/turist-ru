const Event = require('../models/Event');

class EventController {

    async getEventDay(req, res) {
        const { loc, lang, date } = req.params;
        res.status(200).json(
            await Event.getEventOfTheDay(loc, lang, date)
        )

    }
    async getSearch(req, res) {
        const { q, loc, lang } = req.params;
        res.status(200).json(
            await Event.onlineSearch(q, loc, lang)
        )
    }
    async getInfo(req, res) {
        const { id, lang } = req.params;
        res.status(200).json(
            await Event.onlineSearch(id, lang)
        )
    }
    async getPlace(req, res) {
        const { id, lang } = req.params;
        res.status(200).json(
            await Event.onligetPlaceInfo(id, lang)
        )
    }

}

module.exports = new EventController();