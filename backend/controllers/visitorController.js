const VisitorModel = require('../models/visitorModel');

const VisitorController = {
  getVisitors: (req, res) => {
    VisitorModel.getAllVisitors((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching SPOC records' });
      }

      res.json(results);
    });
  },

  addVisitor: (req, res) => {
    const spoc = req.body;

    VisitorModel.addVisitor(spoc, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error assigning SPOC' });
      }

      res.status(201).json({
        id: result.insertId,
        spoc_designation: spoc.spocDesignation,
        visitor_name: spoc.spocName,
        spoc_dob: spoc.spocDob,
        platform: spoc.platform,
        status: 'Inactive'
      });
    });
  },

  updateStatus: (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    VisitorModel.updateStatus(id, status, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating SPOC status' });
      }

      res.json({ message: 'SPOC status updated successfully' });
    });
  },

  deleteVisitor: (req, res) => {
    const id = req.params.id;

    VisitorModel.deleteVisitor(id, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting SPOC' });
      }

      res.json({ message: 'SPOC deleted successfully' });
    });
  }
};

module.exports = VisitorController;