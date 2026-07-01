const db = require('../db');

const ComplaintModel = {
    getAllComplaints: (callback) => {
        const sql = 'SELECT * FROM complaints ORDER BY id DESC';
        db.query(sql, callback);
    },

    addComplaint: (complaint, callback) => {
        const sql = `
            INSERT INTO complaints
            (resident_name, flat_number, title, description, category, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            complaint.residentName,
            complaint.flatNumber,
            complaint.title,
            complaint.description,
            complaint.category,
            'Waiting'
        ], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = 'UPDATE complaints SET status = ? WHERE id = ?';
        db.query(sql, [status, id], callback);
    },

    deleteComplaint: (id, callback) => {
        const sql = 'DELETE FROM complaints WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = ComplaintModel;