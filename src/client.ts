import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BoxberryConfig, BoxberryResponse } from './types';
import { OrdersModule } from './modules/orders';

/**
 * Check if debug mode is enabled
 * @returns {boolean} True if debug mode is enabled
 */
function isDebug() {
  return process.env.DEBUG === '1' || process.env.DEBUG === 'true';
}

/**
 * Boxberry API client for making HTTP requests
 */
export class BoxberryClient {
  private client: AxiosInstance;
  private config: BoxberryConfig;
  public orders: OrdersModule;

  /**
   * Create a new Boxberry API client
   * @param {BoxberryConfig} config - Configuration object
   */
  constructor(config: BoxberryConfig) {
    this.config = {
      baseUrl: 'https://api.boxberry.ru/json.php',
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
    this.orders = new OrdersModule(this);
  }

  /**
   * Setup request and response interceptors
   * @private
   */
  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        // Add token to each request
        if (config.params) {
          config.params.token = this.config.token;
        } else {
          config.params = { token: this.config.token };
        }
        if (isDebug()) {
          console.log('[Boxberry][Request]', {
            url: config.url,
            method: config.method,
            params: config.params,
            data: config.data
          });
        }
        return config;
      },
      (error) => {
        if (isDebug()) {
          console.error('[Boxberry][Request][Error]', error);
        }
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        if (isDebug()) {
          console.log('[Boxberry][Response]', {
            url: response.config.url,
            status: response.status,
            data: response.data
          });
        }
        return response;
      },
      (error) => {
        if (isDebug()) {
          if (error.response) {
            console.error('[Boxberry][Response][Error]', {
              url: error.response.config.url,
              status: error.response.status,
              data: error.response.data
            });
          } else {
            console.error('[Boxberry][Response][Error]', error);
          }
        }
        if (error.response) {
          // Handle API errors
          const errorData = error.response.data;
          let errorMessage = 'Unknown error';
          
          if (typeof errorData === 'object' && errorData !== null) {
            if ('err' in errorData) {
              errorMessage = errorData.err;
            } else if ('error' in errorData) {
              errorMessage = errorData.error;
            }
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }

          // Add HTTP status code to error message
          errorMessage = `[${error.response.status}] ${errorMessage}`;
          
          return Promise.reject(new Error(errorMessage));
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make an HTTP request
   * @param {AxiosRequestConfig} config - Request configuration
   * @returns {Promise<BoxberryResponse<T>>} Response data
   */
  public async request<T>(config: AxiosRequestConfig): Promise<BoxberryResponse<T>> {
    try {
      const response = await this.client.request(config);
      const data = response.data;
      
      // Check if response is an array or data object
      if (Array.isArray(data)) {
        return {
          success: true,
          data: data as T
        };
      }
      
      // If it's an object with error field, return error
      if (data && typeof data === 'object' && 'error' in data) {
        return {
          success: false,
          error: data.error
        };
      }
      
      // Otherwise return success with data
      return {
        success: true,
        data: data as T
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: false,
        error: 'Unknown error occurred'
      };
    }
  }

  /**
   * Make a GET request
   * @param {string} url - Request URL
   * @param {Record<string, unknown>} params - Query parameters
   * @returns {Promise<BoxberryResponse<T>>} Response data
   */
  public get<T>(url: string, params?: Record<string, unknown>): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params
    });
  }

  /**
   * Make a POST request
   * @param {string} url - Request URL
   * @param {unknown} data - Request body
   * @returns {Promise<BoxberryResponse<T>>} Response data
   */
  public post<T>(url: string, data?: unknown): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data
    });
  }
} 