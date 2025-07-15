
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.postHandler.spec.ts
// Mock global fetch
const globalAny: any = global;
globalAny.fetch = jest.fn();

const mockConfig = {
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
} as unknown as jest.Mocked<Config>;

describe('ApiMethods.postHandler() postHandler method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // Happy Path Tests
  // =========================

  it('should send a POST request with correct endpoint, data, and config, and resolve with response data (object body)', async () => {
    // This test ensures that postHandler sends a POST request with the correct parameters and resolves with the expected response data.
    const endpoint = '/test-endpoint';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = { Authorization: 'Bearer token' };
    const responseData = { success: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(mockConfig.getBaseUrl).toHaveBeenCalledTimes(1);
    expect(mockConfig.getHeaders).toHaveBeenCalledTimes(1);
    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should work with stringified body (string data)', async () => {
    // This test ensures that postHandler can handle a string as the data parameter.
    const endpoint = '/string-body';
    const data = JSON.stringify({ foo: 'bar' });
    const baseUrl = 'https://api.example.com';
    const headers = { 'Content-Type': 'application/json' };
    const responseData = { ok: 1 };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should work when headers are empty object', async () => {
    // This test ensures that postHandler works when getHeaders returns an empty object.
    const endpoint = '/no-headers';
    const data = { test: 123 };
    const baseUrl = 'https://api.example.com';
    const headers = {};
    const responseData = { received: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should work when baseUrl is an empty string', async () => {
    // This test ensures that postHandler works when getBaseUrl returns an empty string.
    const endpoint = '/empty-base';
    const data = { a: 1 };
    const baseUrl = '';
    const headers = { 'X-Test': '1' };
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  // =========================
  // Edge Case Tests
  // =========================

  it('should reject if fetch throws an error', async () => {
    // This test ensures that postHandler rejects if fetch throws an error.
    const endpoint = '/error-case';
    const data = { fail: true };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Error': 'yes' };
    const fetchError = new Error('Network error');

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    globalAny.fetch.mockRejectedValue(fetchError as never);

    await expect(ApiMethods.postHandler(endpoint, data, mockConfig)).rejects.toThrow('Network error');
  });

  it('should reject if response.json throws an error', async () => {
    // This test ensures that postHandler rejects if response.json throws an error.
    const endpoint = '/json-error';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Test': 'yes' };
    const jsonError = new Error('Invalid JSON');

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockRejectedValue(jsonError as never),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    await expect(ApiMethods.postHandler(endpoint, data, mockConfig)).rejects.toThrow('Invalid JSON');
  });

  it('should handle getHeaders returning null', async () => {
    // This test ensures that postHandler works when getHeaders returns null.
    const endpoint = '/null-headers';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = null;
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should handle getBaseUrl returning null', async () => {
    // This test ensures that postHandler works when getBaseUrl returns null.
    const endpoint = '/null-baseurl';
    const data = { foo: 'bar' };
    const baseUrl = null;
    const headers = { 'X-Test': 'yes' };
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      'null' + endpoint,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should handle empty endpoint', async () => {
    // This test ensures that postHandler works when endpoint is an empty string.
    const endpoint = '';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Test': 'yes' };
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(responseData as any),
    };
    globalAny.fetch.mockResolvedValue(mockFetchResponse as any);

    const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl,
      {
        method: 'POST',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });
});