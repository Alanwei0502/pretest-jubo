import { api } from '.';

export class PatientApi {
  static async getPatients(name: IPatient['name'] = '') {
    const res = await api.get<(IPatient & { order: IOrder[] })[]>(
      `/patient?name=${name}`
    );
    return res;
  }

  static async createPatient(name: IPatient['name']) {
    const res = await api.post<IPatient>('/patient', { name });
    return res;
  }

  static async updatePatient(id: IPatient['id'], name: IPatient['name']) {
    const res = await api.patch<IPatient>(`/patient/${id}`, { name });
    return res;
  }

  static async deletePatient(id: IPatient['id']) {
    const res = await api.delete<void>(`/patient/${id}`);
    return res;
  }
}
