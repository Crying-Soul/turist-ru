const { Router } = require("express");
const { body, check } = require('express-validator');

const userController = require("../controllers/user.controller");

const router = Router();


router.post(
    "/auth/signup", [
        check("username")
        .exists()
        .withMessage("nickname is required")
        .isLength({ min: 3 })
        .withMessage("wrong nickname length"),

        check("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true })
        .withMessage("email is not valid"),

        check("password")
        .exists()
        .withMessage("password is required")
        .isString().withMessage("password must be string")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password shoul be at least 6 symbols"),
    ],
    userController.createUser
);
router.post(
    "/auth/login", [
        check("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true })
        .withMessage("email is not valid"),

        check("password")
        .exists()
        .withMessage("password is required")
        .isString().withMessage("password must be string")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password shoul be at least 6 symbols"),
    ],
    userController.loginUser
);


module.exports = router;