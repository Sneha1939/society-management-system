const ServiceModel = require('../models/serviceModel');

const ServiceController = {

    getServices: (req, res) => {

        ServiceModel.getAllServices((err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: 'Error fetching services'
                });
            }

            res.json(results);
        });
    },


    createService: (req, res) => {

        const {
            name,
            description,
            base_price,
            status
        } = req.body;

        if (!name || base_price === undefined || base_price === null) {
            return res.status(400).json({
                message: 'Name and base price are required'
            });
        }

        const service = {
            name,
            description: description || '',
            base_price,
            status: status || 'ACTIVE'
        };

        ServiceModel.createService(service, (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: 'Error creating service'
                });
            }

            res.status(201).json({
                message: 'Service created successfully',
                id: result.insertId
            });
        });
    },


    updateService: (req, res) => {

        const id = req.params.id;

        const {
            name,
            description,
            base_price,
            status
        } = req.body;

        if (!name || base_price === undefined || base_price === null) {
            return res.status(400).json({
                message: 'Name and base price are required'
            });
        }

        const service = {
            name,
            description: description || '',
            base_price,
            status: status || 'ACTIVE'
        };

        ServiceModel.updateService(id, service, (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: 'Error updating service'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Service not found'
                });
            }

            res.json({
                message: 'Service updated successfully'
            });
        });
    }

};

module.exports = ServiceController;