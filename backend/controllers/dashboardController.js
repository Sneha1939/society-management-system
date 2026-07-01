const DashboardModel = require('../models/dashboardModel');

const DashboardController = {
  getStats: (req, res) => {
    DashboardModel.getStats((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error fetching dashboard stats'
        });
      }

      res.json(results[0]);
    });
  }
};

module.exports = DashboardController;