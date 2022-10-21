const { Router } = require("express");
const { query } = require('express-validator');

const wikiController = require("../controllers/wiki.controller");

const router = Router();


router.get("/wiki/get", query("query").exists().withMessage("Query is required"), wikiController.getInfo);

module.exports = router;
