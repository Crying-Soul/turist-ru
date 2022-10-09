const { Router } = require("express");

const userController = require("../controllers/user.controller");

const router = Router();


router.get("/user/get", userController.test);


module.exports = router;