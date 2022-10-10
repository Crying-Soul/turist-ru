const Map = require('../models/Map');


class MapController {

    async getRoad(req, res) {

        const data = req.body;
        res.status(200).json(
            await Map.getCoordArr(data)
        );

    }


}


module.exports = new MapController();