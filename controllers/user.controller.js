require('dotenv').config();

const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

class UserController {
    async test(req, res) {
        try {
            res.status(200).json({ data: "ok" });
        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
}


module.exports = new UserController();