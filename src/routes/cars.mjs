import { Router } from 'express';
import { pool } from '../utils/db.mjs';

const router = Router();

const getAllCars = async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const mechanicId = req.session.user.id;

        const client = await pool.query(
            'SELECT id FROM clients WHERE id = $1 AND userId = $2',
            [clientId, mechanicId]
        );
        if (client.rows.length === 0) {
            return res.status(404).send({ msg: 'client not found' });
        }

        const result = await pool.query(`
            SELECT * FROM cars WHERE clientId = $1
        `, [clientId]);
        return res.status(200).json(result.rows);

    } catch (err) {
        return res.status(404).send({msg: 'client has no cars'})
    }
}

const getCar = async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const carId = parseInt(req.params.id);
        const mechanicId = req.session.user.id;

        const result = await pool.query(`
            SELECT cars.*
            FROM cars
            INNER JOIN clients ON clients.id = cars.clientId
            WHERE cars.clientId = $1 AND cars.id = $2 AND clients.userId = $3
        `, [clientId, carId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'car not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const createCar = async (req, res) => {
    try {
        const { body: { brand, model, year, vin } } = req;
        const clientId = parseInt(req.params.clientId);
        const mechanicId = req.session.user.id;

        const result = await pool.query(`
            INSERT INTO cars (brand, model, year, vin, clientId)
            SELECT $1, $2, $3, $4, clients.id
            FROM clients
            WHERE clients.id = $5 AND clients.userId = $6
            RETURNING *
        `, [brand, model, year, vin, clientId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'client not found' });
        }

        return res.status(201).json(result.rows);

    } catch (err) {
        return res.status(500).send({msg: `Server Error`});
    }
}

const deleteCar = async (req, res) => {
    try {
        const carId = parseInt(req.params.id);
        const mechanicId = req.session.user.id;
        
        const result = await pool.query(`
            DELETE FROM cars
            WHERE id = $1
              AND clientId IN (SELECT id FROM clients WHERE userId = $2)
            RETURNING *
        `, [carId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'car not found' });
        }

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}


router.get('/clients/:clientId/cars', getAllCars);
router.get('/clients/:clientId/cars/:id', getCar)
router.post('/clients/:clientId/cars', createCar);
// router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;