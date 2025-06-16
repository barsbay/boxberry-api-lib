# Boxberry API Library Guide

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Modules](#api-modules)
   - [Delivery Module](#delivery-module)
   - [Orders Module](#orders-module)
4. [Examples](#examples)
5. [Error Handling](#error-handling)
6. [Debug Mode](#debug-mode)
7. [Type Definitions](#type-definitions)

## Installation

```bash
npm install boxberry-api-lib
```

## Configuration

```typescript
import { BoxberryClient } from 'boxberry-api-lib';

const client = new BoxberryClient({
  token: 'YOUR_API_TOKEN',    // Required: Your Boxberry API token
  debug: true,               // Optional: Enable debug mode
  timeout: 30000            // Optional: Request timeout in milliseconds
});
```

## API Modules

### Delivery Module

The delivery module provides methods for working with delivery points and calculating delivery costs.

#### Methods

##### `getCities()`
Get list of all available delivery cities.
```typescript
const cities = await client.delivery.getCities();
// Returns: City[]
```

##### `getDeliveryPoints(city: string)`
Get list of delivery points in a specific city.
```typescript
const points = await client.delivery.getDeliveryPoints('Москва');
// Returns: DeliveryPoint[]
```

##### `getDeliveryPointInfo(code: string)`
Get detailed information about a specific delivery point.
```typescript
const pointInfo = await client.delivery.getDeliveryPointInfo('12345');
// Returns: DeliveryPoint | null
```

##### `calculateDeliveryCost(params: DeliveryCostParams)`
Calculate delivery cost based on package parameters.
```typescript
const cost = await client.delivery.calculateDeliveryCost({
  weight: 1000,          // Weight in grams
  target: 'Москва',      // Target city
  ordersum: 1000,        // Order amount
  delivery_sum: 0,       // Delivery cost
  pay_sum: 0,           // Payment amount
  height: 10,           // Height in cm
  width: 10,            // Width in cm
  depth: 10             // Depth in cm
});
// Returns: DeliveryCost
```

##### `checkCourierDelivery(zip: string)`
Check if courier delivery is available for a specific postal code.
```typescript
const courierAvailable = await client.delivery.checkCourierDelivery('123456');
// Returns: boolean
```

##### `listCourierZips()`
Get list of all postal codes where courier delivery is available.
```typescript
const courierZips = await client.delivery.listCourierZips();
// Returns: string[]
```

##### `pointsForParcels()`
Get list of all parcel acceptance points.
```typescript
const parcelPoints = await client.delivery.pointsForParcels();
// Returns: DeliveryPoint[]
```

### Orders Module

The orders module provides methods for working with orders.

#### Methods

##### `createOrder(order: Order)`
Create a new order.
```typescript
const order = await client.orders.createOrder({
  order_id: 'TEST-123',      // Order ID
  price: 1000,              // Order price
  payment_sum: 1000,        // Payment amount
  delivery_sum: 0,          // Delivery cost
  vid: 1,                   // Delivery type
  issue: 1,                 // Issue type
  customer: {               // Customer information
    fio: 'John Doe',
    phone: '9001234567'
  },
  items: [{                 // Order items
    id: '1',
    name: 'Product',
    UnitName: 'pcs',
    price: 1000,
    quantity: 1
  }],
  weights: {                // Package dimensions
    weight: 1000,
    x: 10,
    y: 10,
    z: 10
  }
});
// Returns: Order
```

##### `getOrderStatus(track: string)`
Get current status of an order.
```typescript
const status = await client.orders.getOrderStatus('track123');
// Returns: OrderStatus | null
```

##### `cancelOrder(track: string)`
Cancel an existing order.
```typescript
const cancelled = await client.orders.cancelOrder('track123');
// Returns: boolean
```

##### `updateOrder(order: Order)`
Update order details.
```typescript
const updated = await client.orders.updateOrder({
  track: 'track123',
  price: 2000,
  // ... other order fields
});
// Returns: boolean
```

##### `updateOrderStorageDate(track: string, date: string)`
Update the storage date for an order.
```typescript
const dateUpdated = await client.orders.updateOrderStorageDate(
  'track123',
  '2024-03-20'
);
// Returns: boolean
```

## Examples

### Complete Example

```typescript
import { BoxberryClient } from 'boxberry-api-lib';

async function main() {
  // Create client instance
  const client = new BoxberryClient({
    token: 'YOUR_API_TOKEN',
    debug: true
  });

  try {
    // Get list of cities
    const cities = await client.delivery.getCities();
    console.log('Available cities:', cities);

    // Get delivery points in Moscow
    const points = await client.delivery.getDeliveryPoints('Москва');
    console.log('Delivery points in Moscow:', points);

    // Get information about a specific delivery point
    if (points.length > 0) {
      const pointInfo = await client.delivery.getDeliveryPointInfo(points[0].code);
      console.log('Delivery point info:', pointInfo);
    }

    // Calculate delivery cost
    const cost = await client.delivery.calculateDeliveryCost({
      weight: 1000,
      target: 'Москва',
      ordersum: 1000,
      delivery_sum: 0,
      pay_sum: 0,
      height: 10,
      width: 10,
      depth: 10
    });
    console.log('Delivery cost:', cost);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Error Handling

The library provides detailed error handling:

```typescript
try {
  const result = await client.delivery.getCities();
} catch (error) {
  if (error instanceof BoxberryError) {
    console.error('API Error:', error.message);
    console.error('Error Code:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Debug Mode

Enable debug mode to see detailed information about requests and responses:

```typescript
const client = new BoxberryClient({
  token: 'YOUR_API_TOKEN',
  debug: true
});
```

Debug output includes:
- Request URL and parameters
- Response data
- Error details
- Request timing

## Type Definitions

The library provides TypeScript types for all API responses:

```typescript
import {
  City,              // City information
  DeliveryPoint,     // Delivery point information
  DeliveryCost,      // Delivery cost calculation result
  Order,             // Order information
  OrderStatus,       // Order status information
  BoxberryConfig,    // Client configuration
  BoxberryResponse   // API response wrapper
} from 'boxberry-api-lib';
```

### Common Types

#### `City`
```typescript
interface City {
  code: string;      // City code
  name: string;      // City name
  region: string;    // Region name
  country: string;   // Country name
}
```

#### `DeliveryPoint`
```typescript
interface DeliveryPoint {
  code: string;      // Point code
  name: string;      // Point name
  address: string;   // Full address
  workSchedule: string; // Working hours
  phone: string;     // Contact phone
  email: string;     // Contact email
  coordinates: {     // GPS coordinates
    latitude: number;
    longitude: number;
  }
}
```

#### `Order`
```typescript
interface Order {
  order_id: string;  // Order ID
  price: number;     // Order price
  payment_sum: number; // Payment amount
  delivery_sum: number; // Delivery cost
  vid: number;       // Delivery type
  issue: number;     // Issue type
  customer: {        // Customer information
    fio: string;
    phone: string;
  };
  items: OrderItem[]; // Order items
  weights: {         // Package dimensions
    weight: number;
    x: number;
    y: number;
    z: number;
  };
}
```

## License

MIT 