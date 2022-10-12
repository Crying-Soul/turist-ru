const { Router } = require("express");
const { body, check } = require('express-validator');

const userController = require("../controllers/user.controller");

const router = Router();


router.post("/user/create",
    check('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 3 })
    .withMessage('wrong username length'),
    check('email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('password')
    .exists()
    .withMessage('password is required').isLength({
        min: 3
    }), userController.createUser);


module.exports = router;