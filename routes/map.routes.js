const { Router } = require("express");

const mapController = require("../controllers/map.controller");
const { query } = require('express-validator');
const router = Router();


router.post("/map/route", mapController.getRoad);
router.get("/map/suggest", [
    query('q').exists().withMessage('query is required'),
    query('loc').exists().withMessage('location is required')
], mapController.getSuggest);
router.get("/map/location", [
    query('q').exists().withMessage('query is required'),
    query('loc').exists().withMessage('location is required')
], mapController.getLocByName)


module.exports = router;