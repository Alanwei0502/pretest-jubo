import { Router } from 'express';
import { OrderController } from './../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', OrderController.getOrders);
orderRouter.post('/', OrderController.createOrder);
orderRouter.put('/:id', OrderController.updateOrder);
orderRouter.delete('/:id', OrderController.deleteOrder);

export { orderRouter };
