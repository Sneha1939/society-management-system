const express = require('express');
const VehicleController = require('../controllers/vehicleController');

const router = express.Router();

router.get('/', VehicleController.getVehicles);

router.post('/', VehicleController.addVehicle);

router.put('/:id', VehicleController.updateVehicle);

router.delete('/:id', VehicleController.deleteVehicle);

module.exports = router;