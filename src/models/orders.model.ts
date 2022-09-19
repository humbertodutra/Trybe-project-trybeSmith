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

export default { orderList };