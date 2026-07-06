const db = require('../db');

const VehicleModel = {

  getAllVehicles: (callback) => {
    const sql = `
      SELECT *
      FROM vehicles
      ORDER BY id DESC
    `;

    db.query(sql, callback);
  },

  addVehicle: (vehicle, callback) => {

    const sql = `
      INSERT INTO vehicles
      (owner_name, flat_number, vehicle_type, vehicle_number, parking_slot)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      vehicle.ownerName,
      vehicle.flatNumber,
      vehicle.vehicleType,
      vehicle.vehicleNumber,
      vehicle.parkingSlot
    ], callback);
  },

  updateVehicle: (id, vehicle, callback) => {

    const sql = `
      UPDATE vehicles
      SET
      owner_name = ?,
      flat_number = ?,
      vehicle_type = ?,
      vehicle_number = ?,
      parking_slot = ?
      WHERE id = ?
    `;

    db.query(sql, [
      vehicle.ownerName,
      vehicle.flatNumber,
      vehicle.vehicleType,
      vehicle.vehicleNumber,
      vehicle.parkingSlot,
      id
    ], callback);
  },

  deleteVehicle: (id, callback) => {

    db.query(
      'DELETE FROM vehicles WHERE id = ?',
      [id],
      callback
    );

  }

};

module.exports = VehicleModel;