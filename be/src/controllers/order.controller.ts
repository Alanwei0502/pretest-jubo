import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

export class OrderController {
  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId } = req.params;
      const orders = await OrderModel.getOrders(patientId);
      return res.status(StatusCodes.OK).send(orders);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, message } = req.body;
      const order = await OrderModel.createOrder(patientId, message);
      return res.status(StatusCodes.CREATED).send(order);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const order = await OrderModel.updateOrder(id, message);
      return res.status(StatusCodes.OK).send(order);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await OrderModel.deleteOrder(id);
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
