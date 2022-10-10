const Request = require('./Request');



class Map {

    async getCoordArr(data) {
        return await Request.post('https://sightsafari.city/routecontroller/getpath2', data);


    }

}

module.exports = new Map();