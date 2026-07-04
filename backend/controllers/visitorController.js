const VisitorModel = require('../models/visitorModel');

const VisitorController = {
  getVisitors: (req, res) => {
    VisitorModel.getAllVisitors((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching visitors' });
      }

      res.json(results);
    });
  },

  addVisitor: (req, res) => {
    const visitor = req.body;

    VisitorModel.addVisitor(visitor, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error adding visitor' });
      }

      res.status(201).json({
        id: result.insertId,
        visitor_name: visitor.visitorName,
        phone_number: visitor.phoneNumber,
        flat_number: visitor.flatNumber,
        purpose: visitor.purpose,
        status: 'Expected'
      });
    });
  },

  updateStatus: (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    VisitorModel.updateStatus(id, status, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating visitor status' });
      }

      res.json({ message: 'Visitor status updated successfully' });
    });
  },

  deleteVisitor: (req, res) => {
    const id = req.params.id;

    VisitorModel.deleteVisitor(id, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting visitor' });
      }

      res.json({ message: 'Visitor deleted successfully' });
    });
  }
};

module.exports = VisitorController;