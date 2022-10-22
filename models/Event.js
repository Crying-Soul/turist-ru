const timespan = require('jsonwebtoken/lib/timespan');
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
        const rawEvent = (await Request.get(`https://kudago.com/public-api/v1.4/events/?lang=&fields=&expand=&order_by=&text_format=&ids=&location=${loc}`)).results[0];

        
        
        const data = await this.getEventInfo(rawEvent.id, lang)
        
        
	
	    if (!data.event.place) return data;
	    console.log(data);
	    data.place = (await this.getPlaceInfo(data.event.place.id)).coords
        delete data.event.place
/*
        const rawEvent = (await Request.get(`https://kudago.com/public-api/v1.4/events-of-the-day/?lang=${lang}&fields=&text_format=html&location=${loc}&date=${date}`)).results[0];
	    
	 if(!rawEvent){return null}
	    
        const data = await this.getEventInfo(rawEvent.object.id, lang)
        
	
	    if (!data.event.place) return data;
	    console.log(data);
	    data.place = await this.getPlaceInfo(data.event.place.id)
        delete data.event.place;*/
        return data;

    }
    async onlineSearch(q, loc = 'spb', lang = 'ru', type = 'event') {

        const preData = await Request.get(`https://kudago.com/public-api/v1.4/search/?q=${q}&lang=${lang}&location=${loc}&ctype=${type}`)
	
	  //  let next_page = (await Request.get(preData.next)).results;
	    
	// preData.results.forEach(async req => {
    //     if (req.place) {
    //         req.place = await this.getPlaceInfo(req.place.id)}
    //     })
    // console.log(preData);

    for (let i = 0; i < preData.results.length; i++) {
        const area = preData.results[i];
        area.place.coords = (await this.getPlaceInfo(area.place.id)).coords
        
    }
    
    // preData.results.map(async area => {
    //     area.place.coords = await Request.get(`https://kudago.com/public-api/v1.4/places/${area.place.id}/?lang=ru}`)
    //     return area;
    // })


    //  preData.results.forEach(async obj => {
    //     console.log(await this.getPlaceInfo(obj.place.id) )
        
    // })
  
        
		
        // preData.results.push((await Request.get(preData.     next)).results)
        return preData.results;
    }


}

module.exports = new Event();
