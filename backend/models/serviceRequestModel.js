const db = require('../db');

const ServiceRequestModel = {

    getAllRequests: (callback) => {

        const sql = `
            SELECT
                sr.id,
                sr.customer_name,
                sr.customer_phone,
                sr.service_category_id,
                sc.name AS service_name,
                sr.description,
                sr.address,
                sr.preferred_date,
                sr.preferred_time,
                sr.status,
                sr.created_at
            FROM service_requests sr
            JOIN service_categories sc
                ON sr.service_category_id = sc.id
            ORDER BY sr.id DESC
        `;

        db.query(sql, callback);
    },


    createRequest: (request, callback) => {

        const sql = `
            INSERT INTO service_requests
            (
                customer_name,
                customer_phone,
                service_category_id,
                description,
                address,
                preferred_date,
                preferred_time,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                request.customer_name,
                request.customer_phone,
                request.service_category_id,
                request.description,
                request.address,
                request.preferred_date,
                request.preferred_time,
                request.status
            ],
            callback
        );
    }

};

module.exports = ServiceRequestModel;