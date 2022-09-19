import ordersModel from '../models/orders.model';

const list = () => ordersModel.orderList();

export default { list };