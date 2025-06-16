import { BoxberryClient } from '../client';
import { City, DeliveryPoint, BoxberryPoint, BoxberryCourierZip, BoxberryResponse } from '../types';

/**
 * Module for working with Boxberry delivery services
 */
export class DeliveryModule {
  constructor(private client: BoxberryClient) {}

  /**
   * Get list of delivery cities (ListCities)
   * @returns {Promise<City[]>} Array of cities
   */
  public async getCities(): Promise<City[]> {
    const response = await this.client.get<City[]>('', {
      method: 'ListCities'
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error getting cities list:', response.error);
      return [];
    }
    return response.data || [];
  }

  /**
   * Get list of delivery points (ListPoints)
   * @param {string} cityCode - City code (optional)
   * @returns {Promise<DeliveryPoint[]>} Array of delivery points
   */
  public async getDeliveryPoints(cityCode?: string): Promise<DeliveryPoint[]> {
    const params: Record<string, any> = {
      method: 'ListPoints'
    };

    if (cityCode) {
      params.CityCode = cityCode;
    }

    const response = await this.client.get<DeliveryPoint[]>('', params);
    if (!response.success) {
      console.error('[Boxberry][Error] Error getting delivery points:', response.error);
      return [];
    }
    return response.data || [];
  }

  /**
   * Get detailed information about delivery point (PointsDescription)
   * @param {string} code - Delivery point code
   * @param {boolean} includePhoto - Include photo
   * @returns {Promise<DeliveryPoint | null>} Delivery point information
   */
  public async getDeliveryPointInfo(code: string, includePhoto: boolean = false): Promise<DeliveryPoint | null> {
    const response = await this.client.get<DeliveryPoint>('', {
      method: 'PointsDescription',
      code,
      photo: includePhoto ? 1 : 0
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error getting delivery point info:', response.error);
      return null;
    }
    return response.data || null;
  }

  /**
   * Calculate delivery cost (DeliveryCosts)
   * @param {Object} params - Parameters for cost calculation
   * @param {number} params.weight - Weight in grams
   * @param {string} params.targetstart - City code
   * @param {string} params.target - Delivery point code
   * @param {number} params.ordersum - Order amount
   * @param {number} params.deliverysum - Delivery cost
   * @param {number} params.paysum - Payment amount
   * @param {number} params.height - Height in centimeters
   * @param {number} params.width - Width in centimeters
   * @param {number} params.depth - Depth in centimeters
   * @param {string} [params.zip] - Postal code
   * @returns {Promise<any>} Delivery cost information
   */
  public async calculateDeliveryCost(params: {
    weight: number;
    targetstart: string;
    target: string;
    ordersum: number;
    deliverysum: number;
    paysum: number;
    height: number;
    width: number;
    depth: number;
    zip?: string;
  }): Promise<any> {
    const response = await this.client.get<any>('', {
      method: 'DeliveryCosts',
      ...params
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error calculating delivery cost:', response.error);
      return null;
    }
    if (process.env.DEBUG === '1' || process.env.DEBUG === 'true') {
      console.log('[DEBUG] DeliveryCosts response:', response.data);
    }
    return response.data;
  }

  /**
   * Check courier delivery availability by postal code (ZipCheck)
   * @param {string} zip - Postal code
   * @returns {Promise<boolean>} True if delivery is available
   */
  public async checkCourierDelivery(zip: string): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'ZipCheck',
      Zip: zip
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error checking courier delivery:', response.error);
      return false;
    }
    return response.data?.result || false;
  }

  /**
   * Get list of postal codes for courier delivery (ListZips)
   * @returns {Promise<BoxberryCourierZip[]>} Array of courier zip codes
   */
  public async listCourierZips(): Promise<BoxberryCourierZip[]> {
    const response = await this.client.get<BoxberryCourierZip[]>('', {
      method: 'ListZips'
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error getting courier zip codes:', response.error);
      return [];
    }
    return response.data || [];
  }

  /**
   * Get list of parcel acceptance points (PointsForParcels)
   * @returns {Promise<BoxberryPoint[]>} Array of parcel acceptance points
   */
  public async pointsForParcels(): Promise<BoxberryPoint[]> {
    const response = await this.client.get<BoxberryPoint[]>('', {
      method: 'PointsForParcels'
    });
    if (!response.success) {
      console.error('[Boxberry][Error] Error getting parcel acceptance points:', response.error);
      return [];
    }
    return response.data || [];
  }
} 