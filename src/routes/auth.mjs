import { Router } from 'express';
import { pool } from '../utils/db.mjs';

const router = Router();

const newMechanic = async (req, res) => {
    try {
        const { body: {userName, email, passwordHash} } = req;

        const result = await pool.query('INSERT INTO mechanics (userName, email, passwordHash) VALUES ($1, $2, $3)', [userName, email, passwordHash]);

        return res.status(201).json(result.rows);

    } catch (err) {
        return res.status(401).send({msg: 'User Not Created'})
    }
}

const loginMechanic = async (req, res) => {
    try {
        const { body: { userName, passwordHash } } = req;
        const result = await pool.query(
            'SELECT * FROM mechanics WHERE userName = $1 AND passwordHash = $2',
            [userName, passwordHash]
        );
        if (result.rows.length === 0) {
            return res.status(401).send({ msg: "Bad Credentials" });
        }
        req.session.user = result.rows[0];
        return res.status(200).send(result.rows[0]);

    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const logoutMechanic = async (req, res) => {
    try {
        req.session.destroy();
        return res.clearCookie('connect.sid').status(201).send({msg: 'user logged out'});

    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const getMechanicInfo = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send({ msg: 'Authentication required' });
        }

        res.status(200).send(req.session.user);

    } catch (err) {
        return res.status(500).send({ msg: 'Server Error' });

    }
}

router.post('/auth/register', newMechanic);
router.post('/auth/login', loginMechanic);
router.post('/auth/logout', logoutMechanic);
router.get('/auth/me', getMechanicInfo);


export default router;