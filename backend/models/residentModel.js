const db = require('../db');

const ResidentModel = {
    getAllResidents: (callback) => {
        const sql = 'SELECT * FROM residents ORDER BY id DESC';
        db.query(sql, callback);
    },

    addResident: (resident, callback) => {
        const sql = `
            INSERT INTO residents
            (full_name, flat_number, phone_number, email, emergency_contact, family_members)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            resident.fullName,
            resident.flatNumber,
            resident.phoneNumber,
            resident.email,
            resident.emergencyContact,
            resident.familyMembers
        ], callback);
    },

    updateResident: (id, resident, callback) => {
        const sql = `
            UPDATE residents
            SET full_name = ?, flat_number = ?, phone_number = ?, email = ?,
                emergency_contact = ?, family_members = ?
            WHERE id = ?
        `;

        db.query(sql, [
            resident.fullName,
            resident.flatNumber,
            resident.phoneNumber,
            resident.email,
            resident.emergencyContact,
            resident.familyMembers,
            id
        ], callback);
    },

    deleteResident: (id, callback) => {
        const sql = 'DELETE FROM residents WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = ResidentModel;