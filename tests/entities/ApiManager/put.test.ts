
import ApiManager from '../../../src/entities/ApiManager.js';
import Config from "../../../src/entities/Config.js";
import ApiMethods from "../../../src/helpers/ApiMethods.js";


// src/entities/ApiManager.put.spec.ts
// Manual Jest mock for Config class
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

// Mock ApiMethods.putHandler
jest.mock("../../../src/helpers/ApiMethods", () => ({
  __esModule: true,
  default: {
    putHandler: jest.fn(),
  },
}));

const mockedPutHandler = jest.mocked(ApiMethods.putHandler);

describe('ApiManager.put() put method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should send a PUT request with correct endpoint and data, and resolve with response', async () => {
      // This test ensures that put calls ApiMethods.putHandler with correct arguments and resolves with the expected response.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/123';
      const data = { name: 'John Doe' };
      const response = { success: true, id: 123 };

      // Spy on Config constructor to inject our mockConfig
      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      // Mock putHandler to resolve
      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      // Act
      const result = await apiManager.put(endpoint, data);

      // Assert
      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should work with different data types in the request body', async () => {
      // This test ensures that put works with various data types (e.g., array, number, string).
      const baseUrl = 'http://example.com/api';
      const headers = { 'Accept': 'application/json' };
      const endpoint = '/resource/array';
      const data = [1, 2, 3, 4];
      const response = { updated: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should allow multiple put calls with different endpoints and data', async () => {
      // This test ensures that multiple put calls can be made with different endpoints and data.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Authorization': 'Bearer token' };
      const endpoint1 = '/resource/1';
      const data1 = { foo: 'bar' };
      const response1 = { ok: true };

      const endpoint2 = '/resource/2';
      const data2 = { baz: 42 };
      const response2 = { ok: false };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler
        .mockResolvedValueOnce(response1 as any as never)
        .mockResolvedValueOnce(response2 as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result1 = await apiManager.put(endpoint1, data1);
      const result2 = await apiManager.put(endpoint2, data2);

      expect(mockedPutHandler).toHaveBeenNthCalledWith(1, endpoint1, data1, expect.any(Config));
      expect(mockedPutHandler).toHaveBeenNthCalledWith(2, endpoint2, data2, expect.any(Config));
      expect(result1).toEqual(response1);
      expect(result2).toEqual(response2);
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw if ApiMethods.putHandler rejects (network or server error)', async () => {
      // This test ensures that put propagates errors from putHandler.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/err';
      const data = { test: 'fail' };
      const error = new Error('Network error');

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockRejectedValue(error as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      await expect(apiManager.put(endpoint, data)).rejects.toThrow('Network error');
      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
    });

    it('should handle empty string endpoint', async () => {
      // This test ensures that put can handle an empty string as endpoint.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '';
      const data = { foo: 'bar' };
      const response = { ok: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should handle empty object as data', async () => {
      // This test ensures that put can handle an empty object as data.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/empty';
      const data = {};
      const response = { ok: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should handle deeply nested data objects', async () => {
      // This test ensures that put can handle deeply nested objects as data.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/nested';
      const data = { a: { b: { c: { d: 1 } } } };
      const response = { ok: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should work if headers are not provided in ApiManager constructor', async () => {
      // This test ensures that put works if headers are omitted in the constructor.
      const baseUrl = 'http://example.com/api';
      const endpoint = '/resource/noheaders';
      const data = { test: 1 };
      const response = { ok: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ baseUrl });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });

    it('should work if baseUrl is not provided in ApiManager constructor', async () => {
      // This test ensures that put works if baseUrl is omitted in the constructor.
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/nobaseurl';
      const data = { test: 2 };
      const response = { ok: true };

      jest.spyOn(Config.prototype, 'setBaseUrl').mockImplementation(mockConfig.setBaseUrl);
      jest.spyOn(Config.prototype, 'setHeaders').mockImplementation(mockConfig.setHeaders);

      mockedPutHandler.mockResolvedValue(response as any as never);

      const apiManager = new ApiManager({ headers });

      const result = await apiManager.put(endpoint, data);

      expect(mockedPutHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(result).toEqual(response);
    });
  });
});