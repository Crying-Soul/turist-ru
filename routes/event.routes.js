const { Router } = require("express");
const { query } = require('express-validator');
const eventController = require("../controllers/event.controller");

const router = Router();


router.get("/event/day", eventController.getEventDay);
router.get("/event/search", query('q')
    .exists()
    .withMessage('query is required')
    .isLength({ min: 3 })
    .withMessage('wrong query length'), eventController.getSearch);
router.get("/event",
    query('id')
    .exists()
    .withMessage('id is required'), eventController.getInfo);
router.get("/event/place", query('id')
    .exists()
    .withMessage('id is required'), eventController.getPlace);

module.exports = router;