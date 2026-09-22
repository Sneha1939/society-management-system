const express = require('express');

const ServiceRequestController =
    require('../controllers/serviceRequestController');

const router = express.Router();


router.get(
    '/',
    ServiceRequestController.getRequests
);


router.post(
    '/',
    ServiceRequestController.createRequest
);


module.exports = router;