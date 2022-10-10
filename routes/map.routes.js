const { Router } = require("express");

const mapController = require("../controllers/map.controller");

const router = Router();


router.post("/map/route", mapController.getRoad);


module.exports = router;