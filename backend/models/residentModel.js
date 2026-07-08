const db = require('../db');

const ResidentModel = {
    getAllResidents: (callback) => {
        const sql = 'SELECT * FROM residents ORDER BY id DESC';
        db.query(sql, callback);
    },

    addResident: (resident, callback) => {

    const sql = `
        INSERT INTO residents
        (
            full_name,
            phone_number,
            email,
            state,
            aggregator,
            flat_number,
            emergency_contact,
            family_members
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        resident.fullName,
        resident.phoneNumber,
        resident.email,
        resident.state,
        resident.aggregator,
        '',
        '',
        0
    ], callback);
},
    updateResident: (id, resident, callback) => {

    const sql = `
        UPDATE residents
        SET
            full_name = ?,
            phone_number = ?,
            email = ?,
            state = ?,
            aggregator = ?
        WHERE id = ?
    `;

    db.query(sql, [
        resident.fullName,
        resident.phoneNumber,
        resident.email,
        resident.state,
        resident.aggregator,
        id
    ], callback);
},

    deleteResident: (id, callback) => {
        const sql = 'DELETE FROM residents WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = ResidentModel;