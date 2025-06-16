import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BoxberryConfig, BoxberryResponse } from './types';

function isDebug() {
  return process.env.DEBUG === '1' || process.env.DEBUG === 'true';
}

export class BoxberryClient {
  private client: AxiosInstance;
  private config: BoxberryConfig;

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
  }

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
          const errorMessage = error.response.data?.error || 'Unknown error';
          return Promise.reject(new Error(errorMessage));
        }
        return Promise.reject(error);
      }
    );
  }

  public async request<T>(config: AxiosRequestConfig): Promise<BoxberryResponse<T>> {
    try {
      const response = await this.client.request(config);
      return response.data;
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

  public get<T>(url: string, params?: Record<string, unknown>): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params
    });
  }

  public post<T>(url: string, data?: unknown): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data
    });
  }
} 