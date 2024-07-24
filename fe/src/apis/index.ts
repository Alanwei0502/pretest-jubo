enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

class AppFetch {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    options: RequestInit = {},
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      ...options,
      headers: this.defaultHeaders,
      method,
    };

    if (body && typeof body === 'object') {
      config.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(url, config);

      if (!res.ok) {
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${res.statusText}`
        );
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
  async get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.GET, options);
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.POST, options, body);
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PATCH, options, body);
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.DELETE, options);
  }

  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }
}

export const api = new AppFetch(import.meta.env.VITE_API_URL);
