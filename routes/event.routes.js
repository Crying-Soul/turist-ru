const { Router } = require("express");
const { check } = require('express-validator');
const eventController = require("../controllers/event.controller");

const router = Router();


router.get("/event/day/:loc?/:lang?/:date?", eventController.getEventDay);
router.get("/event/search/:q/:loc?/:lang?", check('q')
    .exists()
    .withMessage('query is required')
    .isLength({ min: 3 })
    .withMessage('wrong query length'), eventController.getSearch);
router.get("/event/:id/:lang?",
    check('id')
    .exists()
    .withMessage('id is required'), eventController.getInfo);
router.get("/event/place/:id/:lang?", check('id')
    .exists()
    .withMessage('id is required'), eventController.getPlace);

module.exports = router;