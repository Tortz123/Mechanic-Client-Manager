import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../utils/db.mjs';

const router = Router();

// bcrypt cost factor: each +1 doubles the time to hash (and to brute-force).
// 10 is OWASP's minimum for bcrypt and takes well under a second.
const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

const newMechanic = async (req, res) => {
    try {
        const { body: {userName, email, password} } = req;

        // Validate on the server too: the signup form's checks can be bypassed
        // by calling the API directly.
        if (typeof userName !== 'string' || typeof password !== 'string' || !userName || !password) {
            return res.status(400).send({ msg: 'Username and password are required' });
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return res.status(400).send({ msg: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
        }

        // userName isn't UNIQUE in the database yet (that constraint comes with
        // the Milestone 5 migration), so check for duplicates here.
        const existing = await pool.query('SELECT id FROM mechanics WHERE userName = $1', [userName]);
        if (existing.rows.length > 0) {
            return res.status(409).send({ msg: 'Username is already taken' });
        }

        // Store only the hash. bcrypt generates a random salt and stores it
        // inside the hash string, so no separate salt column is needed.
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // RETURNING only safe fields: never send passwordHash back to the client.
        const result = await pool.query(
            'INSERT INTO mechanics (userName, email, passwordHash) VALUES ($1, $2, $3) RETURNING id, userName, email',
            [userName, email, passwordHash]
        );

        return res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const loginMechanic = async (req, res) => {
    try {
        const { body: { userName, password } } = req;
        const result = await pool.query(
            'SELECT * FROM mechanics WHERE userName = $1 AND passwordHash = $2',
            [userName, password]
        );
        if (result.rows.length === 0) {
            return res.status(401).send({ msg: "Bad Credentials" });
        }
        req.session.user = result.rows[0];
        return res.status(200).send(result.rows[0]);

    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Server Error' });
    }
}

const logoutMechanic = async (req, res) => {
    try {
        req.session.destroy();
        return res.clearCookie('connect.sid').status(201).send({msg: 'user logged out'});

    } catch (err) {
        console.error(err);
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
        console.error(err);
        return res.status(500).send({ msg: 'Server Error' });

    }
}

router.post('/auth/register', newMechanic);
router.post('/auth/login', loginMechanic);
router.post('/auth/logout', logoutMechanic);
router.get('/auth/me', getMechanicInfo);


export default router;