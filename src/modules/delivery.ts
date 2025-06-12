import { BoxberryClient } from '../client';
import { City, DeliveryPoint, DeliveryCost } from '../types';

export class DeliveryModule {
  constructor(private client: BoxberryClient) {}

  /**
   * Get list of delivery cities
   */
  public async getCities(): Promise<City[]> {
    const response = await this.client.get<City[]>('', {
      method: 'ListCities'
    });
    return response.data || [];
  }

  /**
   * Get list of delivery points
   * @param cityCode City code (optional)
   */
  public async getDeliveryPoints(cityCode?: string): Promise<DeliveryPoint[]> {
    const params: Record<string, any> = {
      method: 'ListPoints'
    };

    if (cityCode) {
      params.CityCode = cityCode;
    }

    const response = await this.client.get<DeliveryPoint[]>('', params);
    return response.data || [];
  }

  /**
   * Get detailed information about delivery point
   * @param code Delivery point code
   * @param includePhoto Include photos
   */
  public async getDeliveryPointInfo(code: string, includePhoto: boolean = false): Promise<DeliveryPoint> {
    const response = await this.client.get<DeliveryPoint>('', {
      method: 'PointsDescription',
      code,
      photo: includePhoto ? 1 : 0
    });
    return response.data as DeliveryPoint;
  }

  /**
   * Calculate delivery cost
   * @param params Delivery cost calculation parameters
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
  }): Promise<DeliveryCost> {
    const response = await this.client.get<DeliveryCost>('', {
      method: 'DeliveryCosts',
      ...params
    });
    return response.data as DeliveryCost;
  }

  /**
   * Check courier delivery availability by postal code
   * @param zip Postal code
   */
  public async checkCourierDelivery(zip: string): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'ZipCheck',
      Zip: zip
    });
    return response.data?.result || false;
  }
} 