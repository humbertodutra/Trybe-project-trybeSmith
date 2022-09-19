import { Request, Response } from 'express';
import orderServices from '../services/order.services';

const orderList = async (req: Request, res: Response) => {
  const result = await orderServices.list();
  return res.status(200).json(result);
};

export default orderList;