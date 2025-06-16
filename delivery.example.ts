import 'dotenv/config';
import { BoxberryAPI } from './src';

/**
 * Main function to demonstrate Boxberry API usage
 * Shows examples of getting cities, delivery points, courier zips,
 * parcel points and calculating delivery cost
 */
async function main() {
  const token = process.env.token;
  if (!token) {
    throw new Error('Token not found in .env');
  }
  const api = new BoxberryAPI({ token });

  try {
    // Get list of cities
    const cities = await api.delivery.getCities();
    console.log('Cities list (first 3):', cities.slice(0, 3));

    // Get delivery points for the first city
    if (cities && cities.length > 0) {
      const cityCode = cities[0].code;
      const points = await api.delivery.getDeliveryPoints(cityCode);
      console.log(`Delivery points for city ${cityCode} (first 3):`, points.slice(0, 3));
    }

    // Get list of courier delivery zip codes
    const zips = await api.delivery.listCourierZips();
    console.log('Courier zip codes (first 3):', zips.slice(0, 3));

    // Get list of parcel acceptance points
    const parcelPoints = await api.delivery.pointsForParcels();
    console.log('Parcel acceptance points (first 3):', parcelPoints.slice(0, 3));

    /**
     * Product information for delivery cost calculation
     * @type {Object}
     */
    const product = {
      weight: 1000,        // Weight in grams
      height: 10,          // Height in centimeters
      width: 10,           // Width in centimeters
      depth: 10,           // Depth in centimeters
      declaredValue: 1000, // Declared value in rubles
      deliverySum: 1000,   // Delivery cost in rubles
      paySum: 1000,        // Payment amount in rubles
      description: 'demo T-shirt',
      name: 'T-shirt',
      quantity: 1,
      sku: '11111111'
    };

    /**
     * Additional delivery parameters
     * @type {Object}
     */
    const extra = {
      target: '6991',      // Delivery point code
      targetstart: '117542', // City code
      zip: '',             // Postal code
      sucrh: '0',          // Search parameter
      cms: '',             // CMS identifier
      url: '',             // URL for callback
      version: '2.2'       // API version
    };

    /**
     * Calculate delivery cost using product and extra parameters
     * @returns {Object} Delivery cost information
     */
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
    });
    console.log('Delivery cost:', cost2);
  } catch (error) {
    console.error('API error:', error);
  }
}

main(); 