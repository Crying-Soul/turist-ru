const Request = require('./Request');



class Map {
    constructor() {
        this.CITIES = {
            "spb": [
                59.94159975589512,
                30.30784606933594

            ],
            "ekb": [
                56.82514421352932,
                60.61530590057374
            ],
            "msk": [
                55.7402547943632,
                37.60929107666016
            ],
            "kzn": [
                55.76615552401725,
                49.01204999999997
            ]
        }
    }


    async getCoordArr(data) {

        return (await Request.post('https://sightsafari.city/routecontroller/getpath2', { desiredCoordinates: data.loc, apiKey: "", debug: false, ...data })).body;
    }
    async getSuggestions(q, loc) {
        // console.log(self.CITIES);
        return (await Request.get(`https://sightsafari.city/geographycontroller/getgeocodersuggestions?desiredCoordinates=${this.CITIES[loc].join('%2C')}&query=${q}`)).body
    }
    async getLocationByName(name) {
        console.log(name);
        return (await Request.get(`https://sightsafari.city/geographycontroller/getlocation?query=${name}&desiredCoordinates=${this.CITIES[loc].join(',')}`)).body;
    }

}

module.exports = new Map();