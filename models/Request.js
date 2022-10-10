var axios = require('axios');

class Request {

    get(url, headers = {}) {

        return new Promise((resolve, reject) => {
            var config = {
                method: "GET",
                url: url,
                headers: headers
            };
            axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
    post(url, data, headers = {}) {

        return new Promise((resolve, reject) => {
            var config = {
                method: "POST",
                url: url,
                headers: headers,
                data: JSON.stringify(data)
            };
            axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

}

module.exports = new Request();