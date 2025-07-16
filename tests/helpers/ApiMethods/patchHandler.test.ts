
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.patchHandler.spec.ts
// Mock global fetch
const globalAny: any = global;
globalAny.fetch = jest.fn();

const mockConfig = {
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
} as unknown as jest.Mocked<Config>;

describe('ApiMethods.patchHandler() patchHandler method', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // Happy Path Tests
  // =========================

  it('should send a PATCH request and resolve with response data (happy path)', async () => {
    // This test ensures patchHandler correctly sends a PATCH request and resolves with the expected response data.
    const endpoint = '/test-endpoint';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = { Authorization: 'Bearer token' };
    const responseData = { success: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    const result = await ApiMethods.patchHandler(endpoint, data, mockConfig);

    expect(mockConfig.getBaseUrl).toHaveBeenCalledTimes(1);
    expect(mockConfig.getHeaders).toHaveBeenCalledTimes(1);
    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should work with different data objects (happy path)', async () => {
    // This test checks that patchHandler works with various data object shapes.
    const endpoint = '/update';
    const data = { id: 123, value: [1, 2, 3], nested: { a: 1 } };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Custom': 'yes' };
    const responseData = { updated: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    const result = await ApiMethods.patchHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should handle string data as body (happy path)', async () => {
    // This test ensures patchHandler can handle string data as the body.
    const endpoint = '/string-body';
    const data = '{"foo":"bar"}';
    const baseUrl = 'https://api.example.com';
    const headers = { 'Content-Type': 'application/json' };
    const responseData = { ok: 1 };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    // @ts-ignore: purposely passing string to test string body
    const result = await ApiMethods.patchHandler(endpoint, data as any, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  // =========================
  // Edge Case Tests
  // =========================

  it('should handle empty object as data (edge case)', async () => {
    // This test checks that patchHandler works when data is an empty object.
    const endpoint = '/empty';
    const data = {};
    const baseUrl = 'https://api.example.com';
    const headers = { Accept: 'application/json' };
    const responseData = { empty: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    const result = await ApiMethods.patchHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should handle when getHeaders returns an empty object (edge case)', async () => {
    // This test ensures patchHandler works when getHeaders returns an empty object.
    const endpoint = '/no-headers';
    const data = { test: 1 };
    const baseUrl = 'https://api.example.com';
    const headers = {};
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    const result = await ApiMethods.patchHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should handle when getBaseUrl returns an empty string (edge case)', async () => {
    // This test checks that patchHandler works when getBaseUrl returns an empty string.
    const endpoint = '/relative';
    const data = { test: 2 };
    const baseUrl = '';
    const headers = { 'X-Test': 'yes' };
    const responseData = { ok: true };

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockResolvedValue(responseData as any);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    const result = await ApiMethods.patchHandler(endpoint, data, mockConfig);

    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
    expect(result).toEqual(responseData);
  });

  it('should reject if fetch throws (edge case)', async () => {
    // This test ensures patchHandler rejects if fetch throws an error.
    const endpoint = '/fail';
    const data = { fail: true };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Fail': 'yes' };
    const fetchError = new Error('Network error');

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    globalAny.fetch.mockRejectedValue(fetchError as never);

    await expect(ApiMethods.patchHandler(endpoint, data, mockConfig)).rejects.toThrow('Network error');
    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
  });

  it('should reject if response.json throws (edge case)', async () => {
    // This test ensures patchHandler rejects if response.json throws an error.
    const endpoint = '/json-fail';
    const data = { foo: 'bar' };
    const baseUrl = 'https://api.example.com';
    const headers = { 'X-Test': 'yes' };
    const jsonError = new Error('Invalid JSON');

    jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
    jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

    const mockJson = jest.fn().mockRejectedValue(jsonError as never);
    globalAny.fetch.mockResolvedValue({
      json: mockJson,
    } as any as Response);

    await expect(ApiMethods.patchHandler(endpoint, data, mockConfig)).rejects.toThrow('Invalid JSON');
    expect(globalAny.fetch).toHaveBeenCalledWith(
      baseUrl + endpoint,
      {
        method: 'PATCH',
        headers,
        body: data as any,
      }
    );
  });
});