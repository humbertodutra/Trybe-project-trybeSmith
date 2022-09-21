import jwt, { JwtPayload } from 'jsonwebtoken';
import OrderListI from '../interfaces/order.interface';
import Token from '../interfaces/token';
import connection from '../models/connection';
import ordersModel from '../models/orders.model';
import ProductModel from '../models/products.model';

const list = () => ordersModel.orderList();

const getUserId = (token:string):JwtPayload => {
  const decodedPayLoad = jwt.decode(token);
  return decodedPayLoad as JwtPayload;
};

const create = async (token: Token, productsIds: number[]):Promise<OrderListI> => {
  const { data } = getUserId(token.token);
  const orderId = await ordersModel.orderCreate(data.userId);
  await Promise.all(productsIds.map((id) => 
    new ProductModel(connection).editProduct({ id, orderId })));
  return {
    userId: data.userId,
    productsIds,
  };
};
export { list, create };