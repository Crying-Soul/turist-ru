require('dotenv').config();

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt')


class UserController {
    async createUser(req, res) {
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                const { username, email, password } = req.body;


                const user = await User.create(username, email, await bcrypt.hash(password, 11));

                res.status(201).json([{
                    user: user
                }])
            } else {
                res.status(400).json({ errors: errors.array() });
            }


        } catch (error) {
            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
}


module.exports = new UserController();