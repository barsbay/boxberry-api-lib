# Руководство по использованию Boxberry API Library

[![npm version](https://img.shields.io/npm/v/boxberry-api-lib.svg)](https://www.npmjs.com/package/boxberry-api-lib)

Библиотека опубликована в npm: https://www.npmjs.com/package/boxberry-api-lib

## Содержание
1. [Установка](#установка)
2. [Базовое использование](#базовое-использование)
3. [Методы API](#методы-api)
4. [Примеры использования](#примеры-использования)
5. [Обработка ошибок](#обработка-ошибок)

## Установка

### Через npm
```bash
npm install boxberry-api-lib
```

### Локальная установка
```bash
npm install /путь/до/boxberryapilib
```

## Базовое использование

### Импорт библиотеки
```typescript
// ES Modules
import { BoxberryClient } from 'boxberry-api-lib';

// CommonJS
const { BoxberryClient } = require('boxberry-api-lib');
```

### Инициализация клиента
```typescript
const client = new BoxberryClient({
    token: 'ваш_токен_boxberry',
    baseUrl: 'https://api.boxberry.ru/json/v1' // опционально
});
```

## Методы API

### Работа с пунктами выдачи
```typescript
// Получение списка пунктов выдачи
const points = await client.getDeliveryPoints({
    city: 'Москва'
});

// Получение информации о конкретном пункте
const pointInfo = await client.getDeliveryPoint({
    code: '12345'
});
```

### Работа с заказами
```typescript
// Создание заказа
const order = await client.createOrder({
    order_id: '12345',
    price: 1000,
    payment_sum: 1000,
    delivery_sum: 300,
    vid: 1,
    shop: {
        name: 'Название магазина'
    },
    customer: {
        fio: 'Иванов Иван Иванович',
        phone: '79001234567'
    },
    items: [
        {
            name: 'Товар 1',
            quantity: 1,
            price: 1000
        }
    ]
});

// Получение статуса заказа
const status = await client.getOrderStatus({
    order_id: '12345'
});
```

### Работа с доставкой
```typescript
// Расчет стоимости доставки
const deliveryCost = await client.calculateDelivery({
    weight: 1000,
    target: 'Москва',
    zip: '101000'
});

// Получение списка городов
const cities = await client.getCities();
```

## Примеры использования

### Полный пример создания заказа
```typescript
import { BoxberryClient } from 'boxberry-api-lib';

async function createBoxberryOrder() {
    const client = new BoxberryClient({
        token: 'ваш_токен_boxberry'
    });

    try {
        // Создаем заказ
        const order = await client.createOrder({
            order_id: '12345',
            price: 1000,
            payment_sum: 1000,
            delivery_sum: 300,
            vid: 1,
            shop: {
                name: 'Мой магазин'
            },
            customer: {
                fio: 'Иванов Иван Иванович',
                phone: '79001234567',
                email: 'ivan@example.com'
            },
            items: [
                {
                    name: 'Смартфон',
                    quantity: 1,
                    price: 1000
                }
            ]
        });

        console.log('Заказ создан:', order);

        // Получаем статус заказа
        const status = await client.getOrderStatus({
            order_id: '12345'
        });

        console.log('Статус заказа:', status);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

## Обработка ошибок

Библиотека использует встроенную обработку ошибок TypeScript. Все методы возвращают Promise, который может быть отклонен в случае ошибки.

```typescript
try {
    const result = await client.someMethod();
} catch (error) {
    if (error instanceof BoxberryError) {
        console.error('Ошибка Boxberry:', error.message);
    } else {
        console.error('Неизвестная ошибка:', error);
    }
}
```

## Типы данных

Библиотека предоставляет TypeScript типы для всех методов и ответов API. Это позволяет получить автодополнение и проверку типов в вашей IDE.

```typescript
import { 
    DeliveryPoint, 
    Order, 
    DeliveryCalculation 
} from 'boxberry-api-lib';

// Пример использования типов
const point: DeliveryPoint = await client.getDeliveryPoint({ code: '12345' });
const order: Order = await client.createOrder({ /* ... */ });
const calculation: DeliveryCalculation = await client.calculateDelivery({ /* ... */ });
```

## Дополнительная информация

- [GitHub репозиторий](https://github.com/barsbay/boxberry-api-lib/)
- [npm пакет](https://www.npmjs.com/package/boxberry-api-lib)

## Поддержка

Если у вас возникли вопросы или проблемы при использовании библиотеки, создайте issue в GitHub репозитории проекта: https://github.com/barsbay/boxberry-api-lib/issues 