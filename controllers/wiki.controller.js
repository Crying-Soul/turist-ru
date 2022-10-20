
const Wiki = require('../models/Wiki')

class WikiController{
    async getInfo(req, res){
        try {
            const validator = validationResult(req);

            const { query } = req.query;

            if (validator.isEmpty()) {
               
               // res.status(200).json(await Wiki.getInfo(query));
		    res.sendStatus(204)
                return;
            }

            res.status(400).json({ error: validator.errors.shift() })
            return;

        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
}
