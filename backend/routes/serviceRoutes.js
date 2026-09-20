const express = require('express');
const ServiceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', ServiceController.getServices);

router.post('/', ServiceController.createService);

router.put('/:id', ServiceController.updateService);

module.exports = router;