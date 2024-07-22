import { Order, Patient } from '@prisma/client';
import { prismaClient } from '../utils/prismaClient.utils';

export class OrderModel {
  static async getOrders(patientId: Patient['id']) {
    const orders = await prismaClient.order.findMany({
      where: {
        patientId,
      },
    });

    return orders;
  }

  static async createOrder(
    patientId: Patient['id'],
    message: Order['message']
  ) {
    const order = await prismaClient.order.create({
      data: {
        patientId,
        message,
      },
    });

    return order;
  }

  static async updateOrder(id: Order['id'], message: Order['message']) {
    const order = await prismaClient.order.update({
      where: { id },
      data: {
        message,
      },
    });

    return order;
  }

  static async deleteOrder(id: string) {
    await prismaClient.order.delete({
      where: { id },
    });
  }
}
