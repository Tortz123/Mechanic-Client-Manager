import { Router } from 'express';
import { pool } from '../utils/db.mjs';

const router = Router();


const getServiceRecordByCar = async (req, res) => {
    try {
        const carId = parseInt(req.params.carId);
        const result = await pool.query(`SELECT * FROM serviceRecords WHERE  carId = $1`, [carId]);
        


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
    

    const result = await pool.query(`INSERT INTO serviceRecords 
        (serviceType, notes, kilometers, serviceDate, carId) VALUES ($1, $2, $3, $4, $5)`
        , [serviceType, notes, kilometers, serviceDate, carId]);

        return res.status(201).json(result.rows);
    } catch (err) {
        return res.status(500).send({msg: 'Server Error'})
    }
}

const deleteServiceRecord = async (req, res) => {
    try {
        const ServiceRecordId = parseInt(req.params.id);
        
        const result = await pool.query(`DELETE FROM serviceRecords WHERE id = $1 RETURNING *`, [ServiceRecordId]);

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