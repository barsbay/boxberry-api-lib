import { BoxberryClient } from '../client';
import { OrderStatus } from '../types';

/**
 * Check if debug mode is enabled
 * @returns {boolean} True if debug mode is enabled
 */
function isDebug() {
  return process.env.DEBUG === '1' || process.env.DEBUG === 'true';
}

/**
 * Module for working with Boxberry orders
 */
export class OrdersModule {
  constructor(private client: BoxberryClient) {}

  /**
   * Create a new order (ParselCreate)
   * @param {Order} order - Order information
   * @returns {Promise<unknown>} Created order information
   */
  public async createOrder(order: Record<string, unknown>): Promise<unknown> {
    try {
      if (isDebug()) {
        console.log('[Boxberry][Debug] Creating order with data:', order);
      }

      const response = await this.client.post<unknown>('', {
        method: 'ParselCreate',
        ...order
      });

      if (isDebug()) {
        console.log('[Boxberry][Debug] Create order response:', response);
      }

      if (!response.success) {
        console.error('[Boxberry][Error] Error creating order:', response.error);
        return null;
      }

      if (!response.data) {
        console.error('[Boxberry][Error] No data received when creating order');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('[Boxberry][Error] Unexpected error when creating order:', error);
      return null;
    }
  }

  /**
   * Get order status (ParselStatus)
   * @param {string} track - Order tracking number
   * @returns {Promise<OrderStatus | null>} Order status information
   */
  public async getOrderStatus(track: string): Promise<OrderStatus | null> {
    try {
      if (isDebug()) {
        console.log('[Boxberry][Debug] Getting status for track:', track);
      }

      const response = await this.client.get<OrderStatus>('', {
        method: 'ParselStatus',
        track
      });

      if (isDebug()) {
        console.log('[Boxberry][Debug] Get status response:', response);
      }

      if (!response.success) {
        console.error('[Boxberry][Error] Error getting order status:', response.error);
        return null;
      }

      if (!response.data) {
        console.error('[Boxberry][Error] No data received when getting order status');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('[Boxberry][Error] Unexpected error when getting order status:', error);
      return null;
    }
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
   * Cancel order (ParselDel)
   * @param {string} track - Order tracking number
   * @returns {Promise<boolean>} True if order was cancelled
   */
  public async cancelOrder(track: string): Promise<boolean> {
    try {
      if (isDebug()) {
        console.log('[Boxberry][Debug] Cancelling order with track:', track);
      }

      const response = await this.client.get<{ result: boolean }>('', {
        method: 'ParselDel',
        track
      });

      if (isDebug()) {
        console.log('[Boxberry][Debug] Cancel order response:', response);
      }

      if (!response.success) {
        console.error('[Boxberry][Error] Error cancelling order:', response.error);
        return false;
      }

      return response.data?.result || false;
    } catch (error) {
      console.error('[Boxberry][Error] Unexpected error when cancelling order:', error);
      return false;
    }
  }

  /**
   * Update order details (ParselUpdate)
   * @param {OrderUpdate} order - Updated order information
   * @returns {Promise<unknown>} True if order was updated
   */
  public async updateOrder(order: Record<string, unknown>): Promise<unknown> {
    try {
      if (isDebug()) {
        console.log('[Boxberry][Debug] Updating order with data:', order);
      }
      const response = await this.client.post<unknown>('', {
        method: 'ParselUpdate',
        ...order
      });
      if (!response.success) {
        console.error('[Boxberry][Error] Error updating order:', response.error);
        return undefined;
      }
      if (typeof response.data === 'object' && response.data !== null && 'result' in response.data) {
        return (response.data as { result: boolean }).result;
      }
      return response.data;
    } catch (error) {
      console.error('[Boxberry][Error] Exception updating order:', error);
      return undefined;
    }
  }

  /**
   * Update order storage date (ParselStorageDate)
   * @param {string} track - Order tracking number
   * @param {string} date - New storage date (YYYY-MM-DD)
   * @returns {Promise<boolean>} True if storage date was updated
   */
  public async updateOrderStorageDate(track: string, date: string): Promise<boolean> {
    try {
      if (isDebug()) {
        console.log('[Boxberry][Debug] Updating storage date:', { track, date });
      }

      const response = await this.client.get<{ result: boolean }>('', {
        method: 'ParselStorageDate',
        track,
        date
      });

      if (isDebug()) {
        console.log('[Boxberry][Debug] Update storage date response:', response);
      }

      if (!response.success) {
        console.error('[Boxberry][Error] Error updating order storage date:', response.error);
        return false;
      }

      return response.data?.result || false;
    } catch (error) {
      console.error('[Boxberry][Error] Unexpected error when updating order storage date:', error);
      return false;
    }
  }
} 