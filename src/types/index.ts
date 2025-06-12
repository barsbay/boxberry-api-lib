export interface BoxberryConfig {
  token: string;
  baseUrl?: string;
}

export interface BoxberryResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface DeliveryPoint {
  code: string;
  name: string;
  address: string;
  phone: string;
  workSchedule: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface City {
  code: string;
  name: string;
  region: string;
}

export interface DeliveryCost {
  price: number;
  deliveryPeriod: number;
  deliveryDate: string;
}

export interface Order {
  order_id: string;
  price: number;
  payment_sum: number;
  delivery_sum: number;
  vid: number;
  issue: number;
  customer: {
    fio: string;
    phone: string;
    phone2?: string;
    email?: string;
  };
  items: Array<{
    id: string;
    name: string;
    UnitName: string;
    nds?: string;
    price: number;
    quantity: number;
    marking_crpt?: string;
  }>;
  weights: {
    weight: number;
    x: number;
    y: number;
    z: number;
  };
}

export interface OrderStatus {
  ImId: string;
  status: string;
  date: string;
  description: string;
} 