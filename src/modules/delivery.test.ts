import { DeliveryModule } from './delivery';
import { BoxberryClient } from '../client';
import { City, DeliveryPoint, DeliveryCost, BoxberryPoint } from '../types';

jest.mock('../client');

const mockClient = {
  get: jest.fn()
} as unknown as BoxberryClient;

const delivery = new DeliveryModule(mockClient);

describe('DeliveryModule', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getCities возвращает массив городов', async () => {
    const cities: City[] = [{ code: '1', name: 'Москва', region: 'Москва' }];
    mockClient.get = jest.fn().mockResolvedValue({ data: cities });
    const result = await delivery.getCities();
    expect(result).toEqual(cities);
  });

  it('getDeliveryPoints возвращает массив ПВЗ', async () => {
    const points: DeliveryPoint[] = [{ code: 'p1', name: 'ПВЗ', address: 'ул. Тестовая', phone: '', workSchedule: '', coordinates: { latitude: 0, longitude: 0 } }];
    mockClient.get = jest.fn().mockResolvedValue({ data: points });
    const result = await delivery.getDeliveryPoints('123');
    expect(result).toEqual(points);
  });

  it('getDeliveryPointInfo возвращает информацию о ПВЗ', async () => {
    const point: DeliveryPoint = { code: 'p1', name: 'ПВЗ', address: 'ул. Тестовая', phone: '', workSchedule: '', coordinates: { latitude: 0, longitude: 0 } };
    mockClient.get = jest.fn().mockResolvedValue({ data: point });
    const result = await delivery.getDeliveryPointInfo('p1');
    expect(result).toEqual(point);
  });

  it('calculateDeliveryCost возвращает стоимость доставки', async () => {
    const cost: DeliveryCost = { price: 100, deliveryPeriod: 2, deliveryDate: '2024-06-01' };
    mockClient.get = jest.fn().mockResolvedValue({ data: cost });
    const params = { weight: 1000, targetstart: '1', target: '2', ordersum: 1000, deliverysum: 0, paysum: 0, height: 10, width: 10, depth: 10 };
    const result = await delivery.calculateDeliveryCost(params);
    expect(result).toEqual(cost);
  });

  it('checkCourierDelivery возвращает true, если доставка возможна', async () => {
    mockClient.get = jest.fn().mockResolvedValue({ data: { result: true } });
    const result = await delivery.checkCourierDelivery('123456');
    expect(result).toBe(true);
  });

  it('listCourierZips возвращает массив индексов', async () => {
    const zips = ['123456', '654321'];
    mockClient.get = jest.fn().mockResolvedValue({ data: zips });
    const result = await delivery.listCourierZips();
    expect(result).toEqual(zips);
  });

  it('pointsForParcels возвращает массив пунктов приёма', async () => {
    const points: BoxberryPoint[] = [{ Code: 'p1', Name: 'Пункт' }];
    mockClient.get = jest.fn().mockResolvedValue({ data: points });
    const result = await delivery.pointsForParcels();
    expect(result).toEqual(points);
  });
}); 