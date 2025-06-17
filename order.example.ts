import 'dotenv/config';
import { BoxberryAPI } from './src';

/**
 * Main function to demonstrate Boxberry API usage
 * Shows examples of creating and managing orders
 */
async function main() {
  const token = process.env.token;
  if (!token) {
    throw new Error('Token not found in .env');
  }
  const api = new BoxberryAPI({ token });

  try {
    // Create a new order
    const order = await api.orders.createOrder({
      order_id: 'TEST-123',
      price: 1000,
      payment_sum: 1000,
      delivery_sum: 0,
      vid: 1,
      issue: 1,
      customer: {
        fio: 'John Doe',
        phone: '9001234567',
        email: 'john@example.com'
      },
      items: [
        {
          id: '1',
          name: 'Smartphone',
          UnitName: 'pcs',
          price: 1000,
          quantity: 1
        }
      ],
      weights: {
        weight: 1000,
        x: 10,
        y: 10,
        z: 10
      }
    });

    if (!order) {
      console.error('Failed to create order');
      return;
    }

    console.log('Created order:', order);

    // Get order status
    const status = await api.orders.getOrderStatus(order.track);
    if (!status) {
      console.error('Failed to get order status');
      return;
    }
    console.log('Order status:', status);

    // Update order details
    const updatedOrder = await api.orders.updateOrder({
      track: order.track,
      price: 1200,
      payment_sum: 1200
    });
    console.log('Updated order:', updatedOrder);

    // Update order storage date
    const storageDate = await api.orders.updateOrderStorageDate('TRACK_NUMBER', '2024-06-10');
    console.log('Updated storage date:', storageDate);

    // Cancel order
    const cancelledOrder = await api.orders.cancelOrder(order.track);
    console.log('Cancelled order:', cancelledOrder);
  } catch (error) {
    console.error('API error:', error);
  }
}

main(); 