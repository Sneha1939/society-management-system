const express = require('express');
const VisitorController = require('../controllers/visitorController');

const router = express.Router();

router.get('/', VisitorController.getVisitors);

router.post('/', VisitorController.addVisitor);

router.put('/:id/status', VisitorController.updateStatus);

router.delete('/:id', VisitorController.deleteVisitor);

module.exports = router;