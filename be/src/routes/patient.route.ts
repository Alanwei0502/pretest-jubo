import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';

const patientRouter = Router();

patientRouter.get('/', PatientController.getPatients);
patientRouter.post('/', PatientController.createPatient);
patientRouter.patch('/:id', PatientController.updatePatient);
patientRouter.delete('/:id', PatientController.deletePatient);

export { patientRouter };
