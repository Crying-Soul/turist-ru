const { Router } = require("express");
const { query } = require('express-validator');

const wikiController = require("../controllers/wiki.controller");

const router = Router();


router.get("/wiki/get", wikiController.getInfo);

module.exports = router;
