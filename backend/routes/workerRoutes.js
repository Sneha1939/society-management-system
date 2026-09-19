const express = require('express');
const WorkerController = require('../controllers/workerController');

const router = express.Router();

router.get('/', WorkerController.getWorkers);

router.put('/:id/status', WorkerController.updateStatus);

module.exports = router;