import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import OrderListI from '../interfaces/order.interface';

const orderList = async () : Promise<OrderListI[]> => {
  const [data] = await connection.execute(
    `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
        FROM Trybesmith.Orders AS o
        JOIN Trybesmith.Products AS p
        ON p.orderId = o.id
        GROUP BY o.id
        ORDER BY o.userId`,
  );
  return data as OrderListI[];
};

const orderCreate = async (userId: number):Promise<number> => {
  const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [result] = await connection.execute<ResultSetHeader>(query, [userId]);
  return result.insertId;
};

export default { orderList, orderCreate };