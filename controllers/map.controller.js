
const Map = require('../models/Map');

const { validationResult } = require('express-validator');
class MapController {

    async getRoad(req, res) {
        try {
            const data = req.body;
            const road = await Map.getCoordArr(data);
            if (road){
                res.status(200).json(road);
                return
            }
            res.sendStatus(204);
            return
           
        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }


    }
    async getCircleRoad(req, res) {
        try {
            const data = req.body;
            const road = await Map.getCircleRoute(data);
            if (road){
                res.status(200).json(road);
                return
            }
            
            res.sendStatus(204);
            return;
           
        } catch (error) {
            
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }


    }
    async getSuggest(req, res) {
        try {
            const { q, loc } = req.query;
            const validator = validationResult(req);
            if (validator.isEmpty()) {
                const suggestions = await Map.getSuggestions(q, loc);
                if (suggestions) {
                    res.status(200).json(suggestions)
                return
                }
                res.sendStatus(204);
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