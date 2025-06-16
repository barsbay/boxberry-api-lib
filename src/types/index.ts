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

/**
 * Коды стран Boxberry для поиска городов и ПВЗ.
 * 643 – Россия
 * 398 – Казахстан
 * 112 – Беларусь
 * 417 - Киргизия
 * 51 - Армения
 * 762 - Таджикистан
 * 860 - Узбекистан
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
 * Тип для пункта выдачи заказов (ПВЗ) Boxberry.
 * Code — обязательный, остальные поля опциональны.
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
 * Тип для товара, используемого при расчёте доставки.
 */
export interface DeliveryProduct {
  /** Вес в граммах */
  weight: number;
  /** Высота в см */
  height: number;
  /** Ширина в см */
  width: number;
  /** Глубина в см */
  depth: number;
  /** Объявленная стоимость (страховая) */
  declaredValue: number;
  /** Стоимость доставки (если требуется) */
  deliverySum?: number;
  /** Сумма к оплате с получателя (если требуется) */
  paySum?: number;
  /** Описание товара */
  description?: string;
  /** Наименование товара */
  name?: string;
  /** Количество */
  quantity?: number;
  /** Артикул или SKU */
  sku?: string;
}

/**
 * Тип для курьерского индекса Boxberry (ListZips)
 */
export interface BoxberryCourierZip {
  Zip: string;
  City: string;
  Region: string;
  Area: string;
  ZoneExpressDelivery: string;
  Remoteness: number;
} 