import { Router } from 'express';
import { patientRouter } from './patient.route';
import { orderRouter } from './order.route';

const apiRouter = Router();

apiRouter.use('/patient', patientRouter);
apiRouter.use('/order', orderRouter);

export { apiRouter };
