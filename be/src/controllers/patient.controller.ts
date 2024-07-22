import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { PatientModel } from '../models/patient.model';

export class PatientController {
  static async getPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await PatientModel.getPatients();
      return res.status(StatusCodes.OK).send(patients);
    } catch (error) {
      next(error);
    }
  }

  static async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const patient = await PatientModel.createPatient(name);
      return res.status(StatusCodes.CREATED).send(patient);
    } catch (error) {
      next(error);
    }
  }

  static async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const patient = await PatientModel.updatePatient(id, name);
      return res.status(StatusCodes.OK).send(patient);
    } catch (error) {
      next(error);
    }
  }

  static async deletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await PatientModel.deletePatient(id);
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
