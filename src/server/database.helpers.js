import { Order } from './database';

export const generateNewOrderId = async () => {
  const count = await Order.count();

  // Add 20 to the count total, so that the first few people don't realize just
  // how early-days it is.
  const newOrderId = count + 20;

  return newOrderId;
};
