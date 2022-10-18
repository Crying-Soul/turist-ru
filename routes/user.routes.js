const { Router } = require("express");
const { body, check } = require('express-validator');

const userController = require("../controllers/user.controller");

const router = Router();


router.post(
    "/auth/signup", [
        check("username")
        .exists()
        .withMessage("Логин не может быть пустым!")
        .isLength({ min: 3 })
        .withMessage("Некоректная длина логина"),

        check("email")
        .exists()
        .withMessage("Емайл не может быть пустым!")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true })
        .withMessage("Некоректный Емейл!"),

        check("password")
        .exists()
        .withMessage("Пароль не может быть пустым")
        .isString().withMessage("password must be string")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    ],
    userController.createUser
);
router.post(
    "/auth/login", [
        check("email")
        .exists()
        .withMessage("Емайл не может быть пустым!")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true })
        .withMessage("Некоректный Емейл!"),

        check("password")
        .exists()
        .withMessage("Пароль не может быть пустым")
        .isString().withMessage("password must be string")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    ],
    userController.loginUser
);


module.exports = router;