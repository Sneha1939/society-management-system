const WorkerModel = require('../models/workerModel');

const WorkerController = {

  getWorkers: (req, res) => {

    WorkerModel.getAllWorkers((err, results) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'Error fetching workers'
        });
      }

      res.json(results);
    });
  },


  updateStatus: (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    WorkerModel.updateWorkerStatus(id, status, (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'Error updating worker status'
        });
      }

      res.json({
        message: 'Worker status updated successfully'
      });
    });
  },


  getMatchingWorkers: (req, res) => {

    const serviceCategoryId = req.params.serviceCategoryId;

    WorkerModel.getMatchingWorkers(
      serviceCategoryId,
      (err, results) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: 'Error finding matching workers'
          });
        }

        res.json(results);
      }
    );
  }

};

module.exports = WorkerController;