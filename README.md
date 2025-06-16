# Boxberry API Library

A TypeScript library for working with the Boxberry delivery service API.

## Installation

```bash
npm install boxberry-api-lib
```

## Quick Start

```typescript
import { BoxberryClient } from 'boxberry-api-lib';

// Create client instance
const client = new BoxberryClient({
  token: 'YOUR_API_TOKEN',
  debug: true // Enable debug mode for detailed logging
});

// Get list of delivery cities
const cities = await client.delivery.getCities();

// Get list of delivery points
const points = await client.delivery.getDeliveryPoints('Москва');

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
```

## Features

- Full TypeScript support
- Detailed error handling
- Debug mode for request/response logging
- Support for all Boxberry API methods
- Automatic response parsing
- Type definitions for all API responses

## Documentation

For detailed documentation and examples, see [GUIDE.md](GUIDE.md).

## License

MIT 

[GitHub репозиторий](https://github.com/barsbay/boxberry-api-lib/)

[issues](https://github.com/barsbay/boxberry-api-lib/issues) 