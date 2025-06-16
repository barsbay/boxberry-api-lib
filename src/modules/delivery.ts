import { BoxberryClient } from '../client';
import { City, DeliveryPoint, BoxberryPoint, BoxberryCourierZip } from '../types';

export class DeliveryModule {
  constructor(private client: BoxberryClient) {}

  /**
   * Получить список городов доставки (ListCities)
   * @returns Массив городов
   */
  public async getCities(): Promise<City[]> {
    const response = await this.client.get<City[]>('', {
      method: 'ListCities'
    });
    return response.data || [];
  }

  /**
   * Получить список ПВЗ (ListPoints)
   * @param cityCode Код города (опционально)
   * @returns Массив ПВЗ
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
   * Получить подробную информацию о ПВЗ (PointsDescription)
   * @param code Код ПВЗ
   * @param includePhoto Включить фото
   * @returns Информация о ПВЗ
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
   * Рассчитать стоимость доставки (DeliveryCosts)
   * @param params Параметры для расчёта стоимости
   * @returns Стоимость доставки (price, price_base, price_service, delivery_period)
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
    if (process.env.DEBUG === '1' || process.env.DEBUG === 'true') {
      console.log('[DEBUG] Ответ DeliveryCosts:', response.data);
    }
    return response.data;
  }

  /**
   * Проверить возможность курьерской доставки по индексу (ZipCheck)
   * @param zip Почтовый индекс
   * @returns true, если доставка возможна
   */
  public async checkCourierDelivery(zip: string): Promise<boolean> {
    const response = await this.client.get<{ result: boolean }>('', {
      method: 'ZipCheck',
      Zip: zip
    });
    return response.data?.result || false;
  }

  /**
   * Получить список почтовых индексов для курьерской доставки (ListZips)
   * @returns Массив объектов с информацией об индексе
   */
  public async listCourierZips(): Promise<BoxberryCourierZip[]> {
    const response = await this.client.get<any[]>('', {
      method: 'ListZips'
    });
    // API возвращает массив объектов с полями Zip, City, Region, Area, ZoneExpressDelivery, Remoteness
    return response.data || [];
  }

  /**
   * Получить список пунктов приёма посылок (PointsForParcels)
   * @returns Массив пунктов приёма
   */
  public async pointsForParcels(): Promise<BoxberryPoint[]> {
    const response = await this.client.get<BoxberryPoint[]>('', {
      method: 'PointsForParcels'
    });
    return response.data || [];
  }
} 