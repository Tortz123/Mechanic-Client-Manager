import { Router } from 'express';
import authRouter from './auth.mjs';
import carRouter from './cars.mjs';
import clientRouter from './clients.mjs';
import serviceRecordRouter from './serviceRecords.mjs';


const router = Router();

router.use(authRouter);
router.use(carRouter);
router.use(clientRouter);
router.use(serviceRecordRouter);

export default router;