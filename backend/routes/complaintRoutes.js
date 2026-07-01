const express = require('express');
const ComplaintController = require('../controllers/complaintController');

const router = express.Router();

router.get('/', ComplaintController.getComplaints);

router.post('/', ComplaintController.addComplaint);

router.put('/:id/status', ComplaintController.updateStatus);

router.delete('/:id', ComplaintController.deleteComplaint);

module.exports = router;