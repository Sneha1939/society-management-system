const AdminModel = require('../models/adminModel');

const AdminController = {
  getAdmins: (req, res) => {
    AdminModel.getAllAdmins((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching dedicated admins' });
      }

      res.json(results);
    });
  },

  addAdmin: (req, res) => {
    const admin = req.body;

    AdminModel.addAdmin(admin, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating dedicated admin' });
      }

      res.status(201).json({
        id: result.insertId,
        admin_name: admin.adminName,
        email: admin.email,
        phone_number: admin.phoneNumber,
        username: admin.username,
        state: admin.state,
        aggregator: admin.aggregator,
        status: 'Active'
      });
    });
  },

  updateStatus: (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    AdminModel.updateAdminStatus(id, status, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating admin status' });
      }

      res.json({ message: 'Admin status updated successfully' });
    });
  },

  deleteAdmin: (req, res) => {
    const id = req.params.id;

    AdminModel.deleteAdmin(id, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting admin' });
      }

      res.json({ message: 'Admin deleted successfully' });
    });
  }
};

module.exports = AdminController;