const Request = require('./Request')


class Wiki{
    async getInfo(query){
        const mainData = (await Request.get(`https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json`)).query.search[0]                   
        mainData.thumb = (await Request.get(`http://ru.wikipedia.org/w/api.php?action=query&titles=${mainData.title}&prop=pageimages&format=json&pithumbsize=100`)).query.pages[mainData.pageid].thumbnail;                   
        const {title, snippet, thumb: source} = mainData
        return  Object.assign({}, {title, text:snippet, ...source});
    }
}

module.exports = new Wiki();
