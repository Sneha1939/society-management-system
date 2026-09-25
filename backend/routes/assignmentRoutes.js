const express = require('express');

const AssignmentController =
  require('../controllers/assignmentController');

const router = express.Router();


router.post(
  '/',
  AssignmentController.assignWorker
);


module.exports = router;