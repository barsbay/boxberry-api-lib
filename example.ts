import 'dotenv/config';
import { BoxberryAPI } from './src';

async function main() {
  const token = process.env.token;
  if (!token) {
    throw new Error('Токен не найден в .env');
  }
  const api = new BoxberryAPI({ token });

  try {
    // Получить список городов
    const cities = await api.delivery.getCities();
    console.log('RAW города:', JSON.stringify(cities, null, 2));

    // Получить ПВЗ по коду города (например, первый город из списка)
    if (cities.length > 0) {
      const cityCode = cities[0].code;
      const points = await api.delivery.getDeliveryPoints(cityCode);
      console.log(`RAW ПВЗ для города ${cityCode}:`, JSON.stringify(points, null, 2));
    }

    // Получить список индексов для курьерской доставки
    const zips = await api.delivery.listCourierZips();
    console.log('RAW курьерские индексы:', JSON.stringify(zips, null, 2));

    // Получить пункты приёма посылок
    const parcelPoints = await api.delivery.pointsForParcels();
    console.log('RAW пункты приёма посылок:', JSON.stringify(parcelPoints, null, 2));

    // Пример расчёта стоимости доставки
    const cost = await api.delivery.calculateDeliveryCost({
      weight: 1000,
      targetstart: '010', // код города отправления
      target: '19733',    // код города назначения
      ordersum: 1000,
      deliverysum: 0,
      paysum: 1000,
      height: 10,
      width: 10,
      depth: 10
    });
    console.log('RAW стоимость доставки:', JSON.stringify(cost, null, 2));

    // Пример расчёта стоимости доставки с product и extra
    const product = {
      weight: 1000,
      height: 10,
      width: 10,
      depth: 10,
      declaredValue: 1000,
      deliverySum: 1000,
      paySum: 1000,
      description: 'demo T-shirt',
      name: 'T-shirt',
      quantity: 1,
      sku: '11111111'
    };
    const extra = {
      target: 'КОД_ПВЗ', // подставьте реальный код ПВЗ
      targetstart: 'КОД_ИНДЕКСА_ИЛИ_ГОРОДА', // подставьте реальный код индекса или города
      zip: '',
      sucrh: '0',
      cms: '',
      url: '',
      version: '2.2'
    };
    const cost2 = await api.delivery.calculateDeliveryCost({
      weight: product.weight,
      target: extra.target,
      targetstart: extra.targetstart,
      ordersum: product.declaredValue,
      deliverysum: product.deliverySum,
      paysum: product.paySum,
      height: product.height,
      width: product.width,
      depth: product.depth,
      zip: extra.zip
      // можно добавить остальные параметры, если API их поддерживает
    });
    console.log('Стоимость доставки (product + extra):', cost2);
  } catch (error) {
    console.error('Ошибка при работе с API:', error);
  }
}

main(); 