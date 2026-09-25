const AssignmentModel =
  require('../models/assignmentModel');

const AssignmentController = {

  assignWorker: (req, res) => {

    const {
      service_request_id,
      worker_id
    } = req.body;


    if (!service_request_id || !worker_id) {

      return res.status(400).json({
        message:
          'Service request ID and worker ID are required'
      });

    }


    AssignmentModel.assignWorker(
      service_request_id,
      worker_id,
      (err, result) => {

        if (err) {

          console.log(err.message);


          if (
            err.message ===
            'SERVICE_REQUEST_NOT_FOUND'
          ) {

            return res.status(404).json({
              message: 'Service request not found'
            });

          }


          if (
            err.message ===
            'SERVICE_REQUEST_NOT_OPEN'
          ) {

            return res.status(409).json({
              message:
                'Service request is no longer open'
            });

          }


          if (
            err.message ===
            'WORKER_NOT_ELIGIBLE'
          ) {

            return res.status(409).json({
              message:
                'Worker is not eligible or available for this service'
            });

          }


          return res.status(500).json({
            message: 'Error assigning worker'
          });

        }


        res.status(201).json({

          message:
            'Worker assigned successfully',

          assignment_id:
            result.insertId

        });

      }
    );

  }

};

module.exports = AssignmentController;