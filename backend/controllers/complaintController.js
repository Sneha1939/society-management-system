const ComplaintModel = require('../models/complaintModel');

const ComplaintController = {
    getComplaints: (req, res) => {
        ComplaintModel.getAllComplaints((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error fetching complaints' });
            }

            res.set('Cache-Control', 'no-store');
            res.json(results);
        });
    },

    addComplaint: (req, res) => {
        const complaint = req.body;

        ComplaintModel.addComplaint(complaint, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error adding complaint' });
            }

            res.status(201).json({
                id: result.insertId,
                resident_name: complaint.residentName,
                flat_number: complaint.flatNumber,
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                status: 'Waiting'
            });
        });
    },

    updateStatus: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;

        ComplaintModel.updateStatus(id, status, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error updating complaint status' });
            }

            res.json({ message: 'Complaint status updated successfully' });
        });
    },

    deleteComplaint: (req, res) => {
        const id = req.params.id;

        ComplaintModel.deleteComplaint(id, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error deleting complaint' });
            }

            res.json({ message: 'Complaint deleted successfully' });
        });
    }
};

module.exports = ComplaintController;