const Request = require('./Request')


class Wiki{
    async getInfo(query){
        return (await Request.get(`https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json`))
    }
}