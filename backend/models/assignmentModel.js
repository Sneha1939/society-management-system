const db = require('../db');

const AssignmentModel = {

  assignWorker: (serviceRequestId, workerId, callback) => {

    db.beginTransaction((err) => {

      if (err) {
        return callback(err);
      }

      const requestSql = `
        SELECT id, status, service_category_id
        FROM service_requests
        WHERE id = ?
        FOR UPDATE
      `;

      db.query(
        requestSql,
        [serviceRequestId],
        (err, requestResults) => {

          if (err) {
            return rollback(err);
          }

          if (requestResults.length === 0) {
            return rollback(
              new Error('SERVICE_REQUEST_NOT_FOUND')
            );
          }

          if (requestResults[0].status !== 'OPEN') {
            return rollback(
              new Error('SERVICE_REQUEST_NOT_OPEN')
            );
          }

          const serviceCategoryId =
            requestResults[0].service_category_id;


          const workerSql = `
            SELECT w.id
            FROM workers w

            JOIN worker_services ws
              ON w.id = ws.worker_id

            WHERE w.id = ?
              AND ws.service_category_id = ?
              AND w.verification_status = 'Verified'
              AND w.availability_status = 'AVAILABLE'

            FOR UPDATE
          `;

          db.query(
            workerSql,
            [workerId, serviceCategoryId],
            (err, workerResults) => {

              if (err) {
                return rollback(err);
              }

              if (workerResults.length === 0) {
                return rollback(
                  new Error('WORKER_NOT_ELIGIBLE')
                );
              }


              const assignmentSql = `
                INSERT INTO job_assignments
                (
                  service_request_id,
                  worker_id,
                  assignment_status
                )
                VALUES (?, ?, 'ASSIGNED')
              `;

              db.query(
                assignmentSql,
                [serviceRequestId, workerId],
                (err, assignmentResult) => {

                  if (err) {
                    return rollback(err);
                  }


                  const updateRequestSql = `
                    UPDATE service_requests
                    SET status = 'ASSIGNED'
                    WHERE id = ?
                  `;

                  db.query(
                    updateRequestSql,
                    [serviceRequestId],
                    (err) => {

                      if (err) {
                        return rollback(err);
                      }


                      const updateWorkerSql = `
                        UPDATE workers
                        SET availability_status = 'BUSY'
                        WHERE id = ?
                      `;

                      db.query(
                        updateWorkerSql,
                        [workerId],
                        (err) => {

                          if (err) {
                            return rollback(err);
                          }


                          db.commit((err) => {

                            if (err) {
                              return rollback(err);
                            }

                            callback(
                              null,
                              assignmentResult
                            );
                          });

                        }
                      );

                    }
                  );

                }
              );

            }
          );

        }
      );


      function rollback(error) {

        db.rollback(() => {
          callback(error);
        });

      }

    });

  }

};

module.exports = AssignmentModel;