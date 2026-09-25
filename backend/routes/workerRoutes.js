const express = require('express');
const WorkerController = require('../controllers/workerController');

const router = express.Router();

router.get('/', WorkerController.getWorkers);

router.get(
  '/matching/:serviceCategoryId',
  WorkerController.getMatchingWorkers
);

router.put(
  '/:id/status',
  WorkerController.updateStatus
);

module.exports = router;