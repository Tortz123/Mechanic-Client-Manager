import { Router } from 'express';
import { pool } from '../utils/db.mjs';

const router = Router();


const getServiceRecordByCar = async (req, res) => {
    try {
        const carId = parseInt(req.params.carId);
        const mechanicId = req.session.user.id;
        const result = await pool.query(`
            SELECT serviceRecords.*
            FROM serviceRecords
            INNER JOIN cars ON cars.id = serviceRecords.carId
            INNER JOIN clients ON clients.id = cars.clientId
            WHERE serviceRecords.carId = $1 AND clients.userId = $2
        `, [carId, mechanicId]);
        


     if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'service-record not found' });
        }
        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const createServiceRecord = async (req, res) => {
    try {
    const { body: { serviceType, notes, kilometers, serviceDate } } = req;
    const carId = parseInt(req.params.carId);
    const mechanicId = req.session.user.id;
    

    const result = await pool.query(`
        INSERT INTO serviceRecords (serviceType, notes, kilometers, serviceDate, carId)
        SELECT $1, $2, $3, $4, cars.id
        FROM cars
        INNER JOIN clients ON clients.id = cars.clientId
        WHERE cars.id = $5 AND clients.userId = $6
        RETURNING *
    `, [serviceType, notes, kilometers, serviceDate, carId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'car not found' });
        }

        return res.status(201).json(result.rows);
    } catch (err) {
        return res.status(500).send({msg: 'Server Error'})
    }
}

const deleteServiceRecord = async (req, res) => {
    try {
        const ServiceRecordId = parseInt(req.params.id);
        const mechanicId = req.session.user.id;
        
        const result = await pool.query(`
            DELETE FROM serviceRecords
            WHERE id = $1
              AND carId IN (
                  SELECT cars.id
                  FROM cars
                  INNER JOIN clients ON clients.id = cars.clientId
                  WHERE clients.userId = $2
              )
            RETURNING *
        `, [ServiceRecordId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'service record not found' });
        }

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

router.get('/cars/:carId/service-records', getServiceRecordByCar);
router.post('/cars/:carId/service-records', createServiceRecord);
// router.put('/service-records/:id', updateServiceRecord);
router.delete('/service-records/:id', deleteServiceRecord);

export default router;