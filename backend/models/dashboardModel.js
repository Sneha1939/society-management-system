const db = require('../db');

const DashboardModel = {
  getStats: (callback) => {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM workers) AS totalWorkers,

        (
          SELECT COUNT(*)
          FROM workers
          WHERE verification_status = 'Pending'
        ) AS pendingWorkers,

        (
          SELECT COUNT(*)
          FROM workers
          WHERE verification_status = 'Verified'
        ) AS verifiedWorkers,

        (
          SELECT COUNT(*)
          FROM workers
          WHERE verification_status = 'Rejected'
        ) AS rejectedWorkers
    `;

    db.query(sql, callback);
  }
};

module.exports = DashboardModel;