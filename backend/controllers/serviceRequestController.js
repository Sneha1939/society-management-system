const ServiceRequestModel =
    require('../models/serviceRequestModel');

const ServiceRequestController = {

    getRequests: (req, res) => {

        ServiceRequestModel.getAllRequests((err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: 'Error fetching service requests'
                });
            }

            res.json(results);
        });
    },


    createRequest: (req, res) => {

        const {
            customer_name,
            customer_phone,
            service_category_id,
            description,
            address,
            preferred_date,
            preferred_time
        } = req.body;


        if (
            !customer_name ||
            !customer_phone ||
            !service_category_id ||
            !description ||
            !address ||
            !preferred_date ||
            !preferred_time
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }


        if (!/^[6-9][0-9]{9}$/.test(customer_phone)) {
            return res.status(400).json({
                message: 'Invalid phone number'
            });
        }


        const request = {
            customer_name,
            customer_phone,
            service_category_id,
            description,
            address,
            preferred_date,
            preferred_time,
            status: 'OPEN'
        };


        ServiceRequestModel.createRequest(
            request,
            (err, result) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: 'Error creating service request'
                    });
                }

                res.status(201).json({
                    message: 'Service request created successfully',
                    id: result.insertId
                });
            }
        );
    }

};

module.exports = ServiceRequestController;