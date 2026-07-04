const db = require('../db');

const VisitorModel = {
  getAllVisitors: (callback) => {
    const sql = 'SELECT * FROM visitors ORDER BY id DESC';
    db.query(sql, callback);
  },

  addVisitor: (visitor, callback) => {
    const sql = `
      INSERT INTO visitors
      (visitor_name, phone_number, flat_number, purpose, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      visitor.visitorName,
      visitor.phoneNumber,
      visitor.flatNumber,
      visitor.purpose,
      'Expected'
    ], callback);
  },

  updateStatus: (id, status, callback) => {
    let sql;

    if (status === 'Checked In') {
      sql = 'UPDATE visitors SET status = ?, entry_time = NOW() WHERE id = ?';
    } else if (status === 'Checked Out') {
      sql = 'UPDATE visitors SET status = ?, exit_time = NOW() WHERE id = ?';
    } else {
      sql = 'UPDATE visitors SET status = ? WHERE id = ?';
    }

    db.query(sql, [status, id], callback);
  },

  deleteVisitor: (id, callback) => {
    const sql = 'DELETE FROM visitors WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = VisitorModel;