import { Router } from 'express';
import carRouter from './cars.mjs';
import clientRouter from './clients.mjs';


const router = Router();

router.use(carRouter);
router.use(clientRouter);

export default router;