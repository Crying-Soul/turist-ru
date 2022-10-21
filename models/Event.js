const Request = require('./Request');

class Event {

    async getPlaceInfo(id, lang = 'ru') {
        return await Request.get(`https://kudago.com/public-api/v1.4/places/${id}/?lang=${lang}`);
    }

    async getEventInfo(id, lang = 'ru') {
        const data = {};
        data.event = await Request.get(`https://kudago.com/public-api/v1.4/events/${id}/?lang=${lang}&fields=id,dates,title,place,short_title,description,body_text,price,images,site_url,tags`);
        data.event.dates.forEach(date => {
            date.start = new Date(date.start * 1000).toISOString().split('T')[0];
            date.end = new Date(date.end * 1000).toISOString().split('T')[0];
        });
        data.comments = await Request.get(`https://kudago.com/public-api/v1.4/events/${id}/comments/?lang=${lang}`);

        return data;
    }

    async getEventOfTheDay(loc = 'spb', lang = 'ru', date = new Date().toISOString().split('T')[0]) {

        

        const rawEvent = (await Request.get(`https://kudago.com/public-api/v1.4/events-of-the-day/?lang=${lang}&fields=&text_format=html&location=${loc}&date=${date}`)).results[0];
	    
	   //	 if(!rawEvent){return null}
	    
        const data = await this.getEventInfo(rawEvent.object.id, lang)
        
	
	    if (!data.event.place) return data;
	    console.log(data);
	    data.place = await this.getPlaceInfo(data.event.place.id)
        delete data.event.place;
        return data;

    }
    async onlineSearch(q, loc = 'spb', lang = 'ru', type = 'event') {

        const preData = await Request.get(`https://kudago.com/public-api/v1.4/search/?q=${q}&lang=${lang}&location=${loc}&ctype=${type}`)
        preData.results.push((await Request.get(preData.next)).results)
        return preData.results;
    }

}

module.exports = new Event();
