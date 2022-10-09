const { Router } = require("express");

const userController = require("../controllers/user.controller");

const router = Router();


router.post("/user/create", userController.createUser);


module.exports = router;