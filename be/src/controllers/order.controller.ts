import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

export class OrderController {
  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId } = req.query;
      const orders = await OrderModel.getOrders(patientId as string);
      return res.status(StatusCodes.OK).send({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, message } = req.body;
      const order = await OrderModel.createOrder(patientId, message);
      return res.status(StatusCodes.CREATED).send({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const order = await OrderModel.updateOrder(id, message);
      return res.status(StatusCodes.OK).send({
        success: true,
        data: order,
      });
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
