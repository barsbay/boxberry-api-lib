/**
 * Boxberry API configuration
 */
export interface BoxberryConfig {
  token: string;
  baseUrl?: string;
  debug?: boolean;
}

/**
 * Boxberry API response wrapper
 */
export interface BoxberryResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

/**
 * Delivery point information
 */
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

/**
 * City information
 */
export interface City {
  code: string;
  name: string;
  region: string;
}

/**
 * Delivery cost information
 */
export interface DeliveryCost {
  price: number;
  deliveryPeriod: number;
  deliveryDate: string;
}

/**
 * Order information
 */
export interface Order {
  order_id: string;
  track?: string;      // Tracking number
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

/**
 * Order update information
 * All fields are optional except track
 */
export interface OrderUpdate {
  track: string;      // Required tracking number
  order_id?: string;
  price?: number;
  payment_sum?: number;
  delivery_sum?: number;
  vid?: number;
  issue?: number;
  customer?: {
    fio?: string;
    phone?: string;
    phone2?: string;
    email?: string;
  };
  items?: Array<{
    id: string;
    name: string;
    UnitName: string;
    nds?: string;
    price: number;
    quantity: number;
    marking_crpt?: string;
  }>;
  weights?: {
    weight: number;
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Order status information
 */
export interface OrderStatus {
  ImId: string;
  status: string;
  date: string;
  description: string;
}

/**
 * Boxberry country codes for city and delivery point search
 * 643 - Russia
 * 398 - Kazakhstan
 * 112 - Belarus
 * 417 - Kyrgyzstan
 * 51 - Armenia
 * 762 - Tajikistan
 * 860 - Uzbekistan
 */
export enum BoxberryCountryCode {
  Russia = 643,
  Kazakhstan = 398,
  Belarus = 112,
  Kyrgyzstan = 417,
  Armenia = 51,
  Tajikistan = 762,
  Uzbekistan = 860,
}

/**
 * Boxberry delivery point (PVD) type
 * Code is required, other fields are optional
 */
export interface BoxberryPoint {
  Code: string;
  Name?: string;
  CityCode?: string;
  Address?: string;
  Phone?: string;
  WorkShedule?: string;
  TripDescription?: string;
  DeliveryPeriod?: number;
  CityName?: string;
  TariffZone?: string;
  Settlement?: string;
  Area?: string;
  Country?: string;
  GPS?: string;
  AddressReduce?: string;
  Acquiring?: string;
  DigitalSignature?: string;
  TypeOfOffice?: string;
  Metro?: string;
  LoadLimit?: number;
  VolumeLimit?: string;
  EnablePartialDelivery?: boolean;
  EnableFitting?: boolean;
  CountryCode?: string;
  NalKD?: string;
  OnlyPrepaidOrders?: string;
  Postamat?: boolean;
  FittingType?: number;
}

/**
 * Product type for delivery cost calculation
 */
export interface DeliveryProduct {
  /** Weight in grams */
  weight: number;
  /** Height in centimeters */
  height: number;
  /** Width in centimeters */
  width: number;
  /** Depth in centimeters */
  depth: number;
  /** Declared value (insurance) */
  declaredValue: number;
  /** Delivery cost (if required) */
  deliverySum?: number;
  /** Payment amount from recipient (if required) */
  paySum?: number;
  /** Product description */
  description?: string;
  /** Product name */
  name?: string;
  /** Quantity */
  quantity?: number;
  /** SKU or article number */
  sku?: string;
}

/**
 * Boxberry courier zip code type (ListZips)
 */
export interface BoxberryCourierZip {
  Zip: string;
  City: string;
  Region: string;
  Area: string;
  ZoneExpressDelivery: string;
  Remoteness: number;
} 