import { Patient } from '@prisma/client';
import { prismaClient } from '../utils/prismaClient.utils';

export class PatientModel {
  static async getPatients() {
    const patients = await prismaClient.patient.findMany({
      include: {
        Order: true,
      },
    });

    return patients;
  }

  static async createPatient(name: Patient['name']) {
    const patient = await prismaClient.patient.create({
      data: {
        name,
      },
    });

    return patient;
  }

  static async updatePatient(id: Patient['id'], name: Patient['name']) {
    const patient = await prismaClient.patient.update({
      where: { id },
      data: {
        name,
      },
    });
    return patient;
  }

  static async deletePatient(id: string) {
    await prismaClient.patient.delete({
      where: { id },
    });
  }
}
