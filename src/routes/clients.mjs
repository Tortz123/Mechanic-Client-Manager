import { Router } from 'express';
import { pool } from '../utils/db.mjs';

const router = Router();


const getAllClients = async (req, res) => {
    try {
        const mechanicId = req.session.user.id;

        const result = await pool.query('SELECT * FROM clients WHERE userId = $1', [mechanicId]);
        return res.status(200).json(result.rows);

    } catch (err) {
        return res.status(404).send({msg: 'Mechanic has no clients'});
    }
}

const getClient = async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);
        const mechanicId = req.session.user.id;

        const result = await pool.query(`SELECT * FROM clients WHERE id = $1 AND userId = $2`, [clientId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'client not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const createClient = async (req, res) => {
    try {
        const { body: { userName } } = req;

        const mechanicId = req.session.user.id;

        const result = await pool.query(`INSERT INTO clients (userName, userId) VALUES ($1, $2)`, [userName, mechanicId]);

        return res.status(201).json(result.rows);

    } catch (err) {
        return res.status(500).send({msg: `Server Error`});
    }

}

const deleteClient = async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);
        const mechanicId = req.session.user.id;

        const result = await pool.query(`DELETE FROM clients WHERE id = $1 AND userId = $2 RETURNING *`, [clientId, mechanicId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ msg: 'client not found' });
        }

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}


router.get('/clients', getAllClients);
router.get('/clients/:id', getClient);
router.post('/clients', createClient);
// router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;