import { api } from '.';

export class OrderApi {
  static async getOrders(patientId: IPatient['id']) {
    const res = await api.get<IOrder[]>(`/order?patientId=${patientId}`);
    return res;
  }

  static async createOrder(
    patientId: IPatient['id'],
    message: IOrder['message']
  ) {
    const res = await api.post<IOrder>('/order', { patientId, message });
    return res;
  }

  static async updateOrder(id: IOrder['id'], message: IOrder['message']) {
    const res = await api.patch<IOrder>(`/order/${id}`, { message });
    return res;
  }

  static async deleteOrder(id: IOrder['id']) {
    const res = await api.delete<void>(`/order/${id}`);
    return res;
  }
}
