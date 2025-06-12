import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BoxberryConfig, BoxberryResponse } from './types';

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
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
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

  public get<T>(url: string, params?: Record<string, any>): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params
    });
  }

  public post<T>(url: string, data?: any): Promise<BoxberryResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data
    });
  }
} 