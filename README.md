# Boxberry API Library

[![npm version](https://img.shields.io/npm/v/boxberry-api-lib.svg)](https://www.npmjs.com/package/boxberry-api-lib)

TypeScript library for working with Boxberry API.

## Установка через npm

```bash
npm install boxberry-api-lib
```

Пакет доступен на npm: https://www.npmjs.com/package/boxberry-api-lib

## Usage

```typescript
import { BoxberryAPI } from 'boxberry-api-lib';

// Create API instance
const api = new BoxberryAPI({
  token: 'your_token'
});

// Get list of cities
const cities = await api.delivery.getCities();

// Get delivery points in city
const points = await api.delivery.getDeliveryPoints('010');

// Calculate delivery cost
const cost = await api.delivery.calculateDeliveryCost({
  weight: 1000,
  targetstart: '010',
  target: '19733',
  ordersum: 1000,
  deliverysum: 0,
  paysum: 1000,
  height: 10,
  width: 10,
  depth: 10
});

// Create order
const order = await api.orders.createOrder({
  order_id: 'TEST-123',
  price: 1000,
  payment_sum: 1000,
  delivery_sum: 0,
  vid: 1,
  issue: 1,
  customer: {
    fio: 'John Doe',
    phone: '9001234567'
  },
  items: [{
    id: '1',
    name: 'Product',
    UnitName: 'pcs',
    price: 1000,
    quantity: 1
  }],
  weights: {
    weight: 1000,
    x: 10,
    y: 10,
    z: 10
  }
});

// Get order status
const status = await api.orders.getOrderStatus(order.track);
```

## Modules

### DeliveryModule

Module for working with delivery:
- Get list of cities
- Get delivery points
- Calculate delivery cost
- Check courier delivery availability

### OrdersModule

Module for working with orders:
- Create/update order
- Get order status
- Cancel order
- Update order details
- Update order storage date

## Data Types

The library provides TypeScript types for all API methods:

```typescript
import { City, DeliveryPoint, Order, OrderStatus } from 'boxberry-api-lib';
```

## License

MIT 

[GitHub репозиторий](https://github.com/barsbay/boxberry-api-lib/)

[issues](https://github.com/barsbay/boxberry-api-lib/issues) 