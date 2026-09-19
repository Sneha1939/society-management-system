const AdminModel = require('../models/adminModel');

const AdminController = {
  getAdmins: (req, res) => {
    AdminModel.getAllAdmins((err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching admins' });
      res.json(results);
    });
  },

  addAdmin: (req, res) => {
    const admin = req.body;

    AdminModel.addAdmin(admin, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating admin' });

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

  login: (req, res) => {
    const { username, password } = req.body;

    AdminModel.loginAdmin(username, password, (err, results) => {
      if (err) return res.status(500).json({ message: 'Login failed' });

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const admin = results[0];

      res.json({
        message: 'Login successful',
        admin: {
          id: admin.id,
          adminName: admin.admin_name,
          username: admin.username,
          state: admin.state,
          aggregator: admin.aggregator
        }
      });
    });
  },

  updateStatus: (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    AdminModel.updateAdminStatus(id, status, (err) => {
      if (err) return res.status(500).json({ message: 'Error updating status' });
      res.json({ message: 'Admin status updated successfully' });
    });
  },

  deleteAdmin: (req, res) => {
    const id = req.params.id;

    AdminModel.deleteAdmin(id, (err) => {
      if (err) return res.status(500).json({ message: 'Error deleting admin' });
      res.json({ message: 'Admin deleted successfully' });
    });
  }
};

module.exports = AdminController;