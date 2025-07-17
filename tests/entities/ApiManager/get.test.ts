
import ApiManager from '../../../src/entities/ApiManager.js';
import Config from "../../../src/entities/Config.js";
import ApiMethods from "../../../src/helpers/ApiMethods.js";


// src/entities/ApiManager.get.spec.ts
// Manual Jest mocks for dependencies
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

jest.mock("../../../src/helpers/ApiMethods", () => ({
  __esModule: true,
  default: {
    getHandler: jest.fn(),
  },
}));

// Helper to reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  // Reset mockGetHandler reference in ApiMethods
  (ApiMethods.getHandler as jest.Mock).mockReset();
});

describe('ApiManager.get() get method', () => {
  //
  // Happy Path Tests
  //
  describe('Happy paths', () => {
    test('should call ApiMethods.getHandler with correct endpoint and config (baseUrl and headers provided)', async () => {
      // This test ensures that get calls ApiMethods.getHandler with the correct arguments when both baseUrl and headers are set.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer token' };
      const endpoint = '/users';
      const expectedResponse = { data: [{ id: 1, name: 'John' }] };

      // Spy on Config's constructor to inject our mockConfig
      const configConstructorSpy = jest.spyOn(Config.prototype, 'constructor');
      // Patch ApiManager's config property after instantiation
      const apiManager = new ApiManager({ baseUrl, headers });
      (apiManager as any).config = mockConfig;

      // Mock ApiMethods.getHandler to resolve with expectedResponse
      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledTimes(1);
      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);

      configConstructorSpy.mockRestore();
    });

    test('should call ApiMethods.getHandler with correct endpoint and config (only baseUrl provided)', async () => {
      // This test ensures that get works when only baseUrl is provided (headers omitted).
      const baseUrl = 'http://example.com/api';
      const endpoint = '/products';
      const expectedResponse = { data: [{ id: 2, name: 'Widget' }] };

      const apiManager = new ApiManager({ baseUrl });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });

    test('should call ApiMethods.getHandler with correct endpoint and config (only headers provided)', async () => {
      // This test ensures that get works when only headers are provided (baseUrl omitted).
      const headers = { Accept: 'application/json' };
      const endpoint = '/orders';
      const expectedResponse = { data: [{ id: 3, status: 'pending' }] };

      const apiManager = new ApiManager({ headers });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });

    test('should call ApiMethods.getHandler with correct endpoint and config (no baseUrl or headers provided)', async () => {
      // This test ensures that get works when neither baseUrl nor headers are provided.
      const endpoint = '/status';
      const expectedResponse = { status: 'ok' };

      const apiManager = new ApiManager({});
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });

    test('should return the value returned by ApiMethods.getHandler', async () => {
      // This test ensures that get returns exactly what ApiMethods.getHandler returns.
      const endpoint = '/echo';
      const expectedResponse = { echo: true };

      const apiManager = new ApiManager({ baseUrl: 'http://test', headers: { X: 'Y' } });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(result).toBe(expectedResponse);
    });
  });

  //
  // Edge Case Tests
  //
  describe('Edge cases', () => {
    test('should handle empty string endpoint', async () => {
      // This test ensures that get can handle an empty string as the endpoint.
      const endpoint = '';
      const expectedResponse = { data: [] };

      const apiManager = new ApiManager({ baseUrl: 'http://test' });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });

    test('should propagate rejection if ApiMethods.getHandler rejects', async () => {
      // This test ensures that get propagates errors from ApiMethods.getHandler.
      const endpoint = '/fail';
      const error = new Error('Network error');

      const apiManager = new ApiManager({ baseUrl: 'http://test' });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockRejectedValue(error as never);

      await expect(apiManager.get(endpoint)).rejects.toThrow('Network error');
      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
    });

    test('should work with endpoints containing special characters', async () => {
      // This test ensures that get works with endpoints that have special characters.
      const endpoint = '/users/äöü-ß?param=✓';
      const expectedResponse = { data: [{ id: 4, name: 'Special' }] };

      const apiManager = new ApiManager({ baseUrl: 'http://test' });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });

    test('should work with very long endpoint strings', async () => {
      // This test ensures that get works with very long endpoint strings.
      const endpoint = '/'.padEnd(2048, 'a');
      const expectedResponse = { data: 'long' };

      const apiManager = new ApiManager({ baseUrl: 'http://test' });
      (apiManager as any).config = mockConfig;

      (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

      const result = await apiManager.get(endpoint);

      expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toBe(expectedResponse);
    });
  });
});