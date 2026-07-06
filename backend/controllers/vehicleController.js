const VehicleModel = require('../models/vehicleModel');

const VehicleController = {

  getVehicles: (req, res) => {
    VehicleModel.getAllVehicles((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error fetching vehicles'
        });
      }

      res.json(results);
    });
  },

  addVehicle: (req, res) => {
    const vehicle = req.body;

    VehicleModel.addVehicle(vehicle, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error adding vehicle'
        });
      }

      res.status(201).json({
        id: result.insertId,
        owner_name: vehicle.ownerName,
        flat_number: vehicle.flatNumber,
        vehicle_type: vehicle.vehicleType,
        vehicle_number: vehicle.vehicleNumber,
        parking_slot: vehicle.parkingSlot
      });
    });
  },

  updateVehicle: (req, res) => {
    const id = req.params.id;
    const vehicle = req.body;

    VehicleModel.updateVehicle(id, vehicle, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error updating vehicle'
        });
      }

      res.json({
        message: 'Vehicle updated successfully'
      });
    });
  },

  deleteVehicle: (req, res) => {
    const id = req.params.id;

    VehicleModel.deleteVehicle(id, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error deleting vehicle'
        });
      }

      res.json({
        message: 'Vehicle deleted successfully'
      });
    });
  }

};

module.exports = VehicleController;