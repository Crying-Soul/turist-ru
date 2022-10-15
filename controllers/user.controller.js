require('dotenv').config();

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt')


class UserController {
    async createUser(req, res) {
        try {
            const validator = validationResult(req);

            const { username, email, password } = req.body;

            if (await User.isUserExists(email)) {
                validator.errors.push({ msg: "Such user already exists! " })
            } else if (validator.isEmpty()) {
                const user = await User.create(username, email, await bcrypt.hash(password, 11));

                console.log(user);

                const token = jwt.sign({ userId: user.id },
                    process.env.JWT_SECRET, { expiresIn: '1h' }
                );
                res.status(201).json({ token: token, userId: user.id });
                return;
            }

            res.status(400).json({ error: validator.errors.shift() })
            return;

        } catch (error) {

            res.status(500).json([{ msg: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }
    }
    async loginUser(req, res) {
        try {
            const validator = validationResult(req);
            const { email, password } = req.body;

            console.log(email, password)

            const user = await User.findOne(email);


            if (!user) {
                validator.errors.push({ msg: "Such user doesnt't exists! " })
            } else if (!await bcrypt.compare(password, user.password)) {
                validator.errors.push({ msg: "Incorrect password! " })
            } else if (validator.isEmpty()) {
                const token = jwt.sign({ userId: user.id },
                    process.env.JWT_SECRET, { expiresIn: '1h' }
                );
                res.status(200).json({ token: token, userId: user.id });
                return;
            }

            res.status(400).json({ error: validator.errors.shift() })
            return;

        } catch (error) {

            res.status(500).json([{ message: "Something went wrong, try one more time" }, { dev_message: error.message }])
        }

    }
}


module.exports = new UserController();