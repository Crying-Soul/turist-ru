const Map = require('../models/Map');

const { validationResult } = require('express-validator');
class MapController {

    async getRoad(req, res) {
        try {
            const data = req.body;
            res.status(200).json(await Map.getCoordArr(data));
        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }


    }
    async getCircleRoad(req, res) {
        try {
            const data = req.body;
            res.status(200).json(await Map.getCircleRoute(data));
        } catch (error) {
            
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }


    }
    async getSuggest(req, res) {
        try {
            const { q, loc } = req.query;
            const validator = validationResult(req);
            if (validator.isEmpty()) {
                res.status(200).json(await Map.getSuggestions(q, loc))
                return
            }
            res.status(400).json({ error: validator.errors.shift() })
            return

        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])

        }
    }
    async getLocByName(req, res) {
        try {
            const { q, loc } = req.query;
            const validator = validationResult(req);
            if (validator.isEmpty()) {
                res.status(200).json(await Map.getLocationByName(q, loc))
                return
            }
            res.status(400).json({ error: validator.errors.shift() })
            return
        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
}


module.exports = new MapController();