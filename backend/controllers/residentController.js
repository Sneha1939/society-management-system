const ResidentModel = require('../models/residentModel');

const ResidentController = {

    getResidents: (req, res) => {
        ResidentModel.getAllResidents((err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error fetching residents'
                });
            }

            res.json(results);
        });
    },

    addResident: (req, res) => {

        const resident = req.body;

        ResidentModel.addResident(resident, (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error adding resident'
                });
            }

            res.status(201).json({
                id: result.insertId,
                full_name: resident.fullName,
                flat_number: resident.flatNumber,
                phone_number: resident.phoneNumber,
                email: resident.email,
                emergency_contact: resident.emergencyContact,
                family_members: resident.familyMembers
            });
        });
    },

    updateResident: (req, res) => {

        const id = req.params.id;
        const resident = req.body;

        ResidentModel.updateResident(id, resident, (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error updating resident'
                });
            }

            res.json({
                message: 'Resident updated successfully'
            });
        });
    },

    deleteResident: (req, res) => {

        const id = req.params.id;

        ResidentModel.deleteResident(id, (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error deleting resident'
                });
            }

            res.json({
                message: 'Resident deleted successfully'
            });
        });
    }

};

module.exports = ResidentController;