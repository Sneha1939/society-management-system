const db = require('../db');

const WorkerModel = {
  getAllWorkers: (callback) => {
    const sql = 'SELECT * FROM workers ORDER BY id DESC';
    db.query(sql, callback);
  },

  updateWorkerStatus: (id, status, callback) => {
    const sql = 'UPDATE workers SET verification_status = ? WHERE id = ?';
    db.query(sql, [status, id], callback);
  }
};

module.exports = WorkerModel;