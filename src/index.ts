import { BoxberryClient } from './client';
import { DeliveryModule } from './modules/delivery';
import { OrdersModule } from './modules/orders';
import { BoxberryConfig } from './types';

export class BoxberryAPI {
  public readonly delivery: DeliveryModule;
  public readonly orders: OrdersModule;

  constructor(config: BoxberryConfig) {
    const client = new BoxberryClient(config);
    this.delivery = new DeliveryModule(client);
    this.orders = new OrdersModule(client);
  }
}

export * from './types'; 