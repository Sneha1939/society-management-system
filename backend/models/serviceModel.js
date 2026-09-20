const db = require('../db');

const ServiceModel = {

    getAllServices: (callback) => {
        const sql = 'SELECT * FROM service_categories ORDER BY id DESC';
        db.query(sql, callback);
    },

    createService: (service, callback) => {
        const sql = `
            INSERT INTO service_categories
            (name, description, base_price, status)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                service.name,
                service.description,
                service.base_price,
                service.status
            ],
            callback
        );
    },

    updateService: (id, service, callback) => {
        const sql = `
            UPDATE service_categories
            SET name = ?,
                description = ?,
                base_price = ?,
                status = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                service.name,
                service.description,
                service.base_price,
                service.status,
                id
            ],
            callback
        );
    }

};

module.exports = ServiceModel;