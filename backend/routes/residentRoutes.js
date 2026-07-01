const express = require('express');
const ResidentController = require('../controllers/residentController');

const router = express.Router();

router.get('/', ResidentController.getResidents);

router.post('/', ResidentController.addResident);

router.put('/:id', ResidentController.updateResident);

router.delete('/:id', ResidentController.deleteResident);

module.exports = router;