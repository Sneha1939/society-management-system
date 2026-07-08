const express = require('express');
const AdminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', AdminController.getAdmins);

router.post('/', AdminController.addAdmin);

router.put('/:id/status', AdminController.updateStatus);

router.delete('/:id', AdminController.deleteAdmin);

module.exports = router;