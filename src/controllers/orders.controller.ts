import { Request, Response } from 'express';
import { list, create } from '../services/order.services';
import Token from '../interfaces/token';
import verify from '../errorMiddleware';

const orderList = async (req: Request, res: Response) => {
  const result = await list();
  return res.status(200).json(result);
};

const createController = async (req: Request, res: Response) => {
  const token = {
    token: req.headers.authorization,
  };
  const { productsIds } = req.body;
  console.log(productsIds);
  
  const verifyReq = verify(productsIds);
  if (verifyReq !== null) {
    return res.status(verifyReq.status).json(verifyReq.message);
  }
  const result = await create(token as Token, productsIds);
  return res.status(201).json(result);
};

export {
  orderList,
  createController,
};
