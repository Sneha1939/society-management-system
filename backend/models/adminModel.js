const db = require('../db');

const AdminModel = {
  getAllAdmins: (callback) => {
    const sql = 'SELECT * FROM dedicated_admins ORDER BY id DESC';
    db.query(sql, callback);
  },

  addAdmin: (admin, callback) => {
    const sql = `
      INSERT INTO dedicated_admins
      (admin_name, email, phone_number, username, password, state, aggregator, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      admin.adminName,
      admin.email,
      admin.phoneNumber,
      admin.username,
      admin.password,
      admin.state,
      admin.aggregator,
      'Active'
    ], callback);
  },

  updateAdminStatus: (id, status, callback) => {
    const sql = 'UPDATE dedicated_admins SET status = ? WHERE id = ?';
    db.query(sql, [status, id], callback);
  },

  deleteAdmin: (id, callback) => {
    const sql = 'DELETE FROM dedicated_admins WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = AdminModel;