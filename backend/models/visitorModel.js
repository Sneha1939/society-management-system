const db = require('../db');

const VisitorModel = {
  getAllVisitors: (callback) => {
    const sql = 'SELECT * FROM visitors ORDER BY id DESC';
    db.query(sql, callback);
  },

  addVisitor: (visitor, callback) => {
    const sql = `
      INSERT INTO visitors
      (spoc_designation, visitor_name, spoc_dob, platform, status, phone_number, flat_number, purpose)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      visitor.spocDesignation,
      visitor.spocName,
      visitor.spocDob,
      visitor.platform,
      'Inactive',
      '',
      '',
      ''
    ], callback);
  },

  updateStatus: (id, status, callback) => {
    const sql = 'UPDATE visitors SET status = ? WHERE id = ?';
    db.query(sql, [status, id], callback);
  },

  deleteVisitor: (id, callback) => {
    const sql = 'DELETE FROM visitors WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = VisitorModel;