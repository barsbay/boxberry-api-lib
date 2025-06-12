import { BoxberryClient } from '../client';
import { Order, OrderStatus } from '../types';

export class OrdersModule {
  constructor(private client: BoxberryClient) {}

  /**
   * Create or update order
   * @param order Order data
   */
  public async createOrder(order: Order): Promise<{ track: string }> {
    const response = await this.client.post<{ track: string }>('', {
      method: 'ParselCreate',
      sdata: order
    });
    return response.data as { track: string };
  }

  /**
   * Get order status
   * @param track Tracking number
   */
  public async getOrderStatus(track: string): Promise<OrderStatus[]> {
    const response = await this.client.get<OrderStatus[]>('', {
      method: 'ListStatuses',
      ImId: track
    });
    return response.data || [];
  }

  /**
   * Get extended order status
   * @param track Tracking number
   */
  public async getOrderStatusFull(track: string): Promise<OrderStatus[]> {
    const response = await this.client.get<OrderStatus[]>('', {
      method: 'ListStatusesFull',
      ImId: track
    });
    return response.data || [];
  }

  /**
   * Cancel order
   * @param track Tracking number
   * @param cancelType Cancel type (1 - cancel delivery, 2 - delete order)
   */
  public async cancelOrder(track: string, cancelType: 1 | 2 = 1): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'CancelOrder',
      track,
      cancelType
    });
    return response.data?.result || false;
  }

  /**
   * Update order details
   * @param track Tracking number
   * @param data New order data
   */
  public async updateOrderDetails(track: string, data: {
    fio?: string;
    phone?: string;
    email?: string;
  }): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'ChangeOrderDetails',
      track,
      ...data
    });
    return response.data?.result || false;
  }

  /**
   * Update order storage date
   * @param track Tracking number
   * @param storageDate New storage date in DD.MM.YYYY format
   */
  public async updateOrderStorageDate(track: string, storageDate: string): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'ChangeOrderStorageDate',
      track,
      storageDate
    });
    return response.data?.result || false;
  }
} 