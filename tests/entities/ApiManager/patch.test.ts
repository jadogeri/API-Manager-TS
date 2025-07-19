
import ApiManager from '../../../src/entities/ApiManager';
import Config from "../../../src/entities/Config";
import ApiMethods from "../../../src/helpers/ApiMethods";


// src/entities/ApiManager.patch.spec.ts
// --- Mocks ---

// Mock Config class
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

// Mock ApiMethods
jest.mock("../../../src/helpers/ApiMethods", () => ({
  __esModule: true,
  default: {
    patchHandler: jest.fn(),
  },
}));
const mockPatchHandler = jest.mocked(ApiMethods.patchHandler);

// Patch the Config constructor to always return our mockConfig
jest.mock("../../../src/entities/Config", () => {
  return jest.fn().mockImplementation(() => mockConfig);
});

describe('ApiManager.patch() patch method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Happy Paths ---

  it('should send a PATCH request and resolve with the API response (basic usage)', async () => {
    // This test ensures that patch calls ApiMethods.patchHandler with correct arguments and resolves with the response.
    const baseUrl = 'http://example.com/api';
    const headers = { 'Content-Type': 'application/json' };
    const endpoint = '/resource/1';
    const data = { name: 'John' };
    const apiResponse = { success: true, data: { id: 1, name: 'John' } };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledTimes(1);
    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should work with different data types in the PATCH body', async () => {
    // This test ensures that patch works with various data types (object, array, string, number).
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '/resource/2';
    const data = [1, 2, 3];
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should allow patching with empty object as data', async () => {
    // This test ensures that patch works when data is an empty object.
    const baseUrl = 'http://example.com/api';
    const headers = { Authorization: 'Bearer token' };
    const endpoint = '/resource/3';
    const data = {};
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should allow patching with a string as data', async () => {
    // This test ensures that patch works when data is a string.
    const baseUrl = 'http://example.com/api';
    const headers = { Authorization: 'Bearer token' };
    const endpoint = '/resource/4';
    const data = 'raw string data';
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should allow patching with a number as data', async () => {
    // This test ensures that patch works when data is a number.
    const baseUrl = 'http://example.com/api';
    const headers = { Authorization: 'Bearer token' };
    const endpoint = '/resource/5';
    const data = 12345;
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should use the current config instance when calling patchHandler', async () => {
    // This test ensures that the config instance used is the one held by ApiManager.
    const baseUrl = 'http://example.com/api';
    const headers = { 'X-Test': 'yes' };
    const endpoint = '/resource/6';
    const data = { test: true };
    const apiResponse = { ok: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    // Simulate config being updated
    const newConfig = {
      ...mockConfig,
      getBaseUrl: jest.fn().mockReturnValue('http://new-url.com'),
    } as unknown as jest.Mocked<Config>;
    (apiManager as any).config = newConfig;

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, newConfig);
    expect(result).toBe(apiResponse);
  });

  // --- Edge Cases ---

  it('should handle empty string endpoint', async () => {
    // This test ensures that patch works when endpoint is an empty string.
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '';
    const data = { foo: 'bar' };
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should handle empty object as headers in config', async () => {
    // This test ensures that patch works when headers are an empty object.
    const baseUrl = 'http://example.com/api';
    const headers = {};
    const endpoint = '/resource/7';
    const data = { foo: 'bar' };
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should handle deeply nested data objects', async () => {
    // This test ensures that patch works with deeply nested objects as data.
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '/resource/8';
    const data = { a: { b: { c: { d: 1 } } } };
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should propagate errors thrown by ApiMethods.patchHandler', async () => {
    // This test ensures that errors from patchHandler are propagated.
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '/resource/9';
    const data = { error: true };
    const error = new Error('API error');

    mockPatchHandler.mockRejectedValue(error as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    await expect(apiManager.patch(endpoint, data)).rejects.toThrow('API error');
    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
  });

  it('should handle patch with undefined data', async () => {
    // This test ensures that patch works when data is undefined.
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '/resource/10';
    const data = undefined;
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });

  it('should handle patch with null data', async () => {
    // This test ensures that patch works when data is null.
    const baseUrl = 'http://example.com/api';
    const headers = { Accept: 'application/json' };
    const endpoint = '/resource/11';
    const data = null;
    const apiResponse = { updated: true };

    mockPatchHandler.mockResolvedValue(apiResponse as any as never);

    const apiManager = new ApiManager({ baseUrl, headers });

    const result = await apiManager.patch(endpoint, data);

    expect(mockPatchHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
    expect(result).toBe(apiResponse);
  });
});