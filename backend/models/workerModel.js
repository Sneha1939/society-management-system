const db = require('../db');

const WorkerModel = {

  getAllWorkers: (callback) => {
    const sql = 'SELECT * FROM workers ORDER BY id DESC';
    db.query(sql, callback);
  },

  updateWorkerStatus: (id, status, callback) => {
    const sql =
      'UPDATE workers SET verification_status = ? WHERE id = ?';

    db.query(sql, [status, id], callback);
  },

  getMatchingWorkers: (serviceCategoryId, callback) => {

    const sql = `
      SELECT
        w.id,
        w.worker_name,
        w.phone_number,
        w.aggregator,
        w.state,
        w.workplace_name,
        w.verification_status,
        w.availability_status,
        sc.name AS service_name
      FROM workers w

      JOIN worker_services ws
        ON w.id = ws.worker_id

      JOIN service_categories sc
        ON ws.service_category_id = sc.id

      WHERE ws.service_category_id = ?
        AND w.verification_status = 'Verified'
        AND w.availability_status = 'AVAILABLE'
        AND sc.status = 'ACTIVE'

      ORDER BY w.worker_name
    `;

    db.query(sql, [serviceCategoryId], callback);
  }

};

module.exports = WorkerModel;