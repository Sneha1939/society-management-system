const db = require('../db');

const DashboardModel = {
  getStats: (callback) => {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM residents) AS totalResidents,
        (SELECT COUNT(*) FROM complaints) AS totalComplaints,
        (SELECT COUNT(*) FROM complaints WHERE status = 'Waiting') AS waitingComplaints,
        (SELECT COUNT(*) FROM complaints WHERE status = 'Resolved') AS resolvedComplaints
    `;

    db.query(sql, callback);
  }
};

module.exports = DashboardModel;