
import ApiManager from '../../../src/entities/ApiManager';
import Config from "../../../src/entities/Config";
import ApiMethods from "../../../src/helpers/ApiMethods";


// src/entities/ApiManager.post.spec.ts
// Manual Jest mock for Config class
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

// Mock ApiMethods.postHandler
jest.mock("../../../src/helpers/ApiMethods", () => ({
  __esModule: true,
  default: {
    postHandler: jest.fn(),
  },
}));

const mockedPostHandler = jest.mocked(ApiMethods.postHandler);

describe('ApiManager.post() post method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // Happy Path Tests
  // =========================
  describe('Happy paths', () => {
    it('should send a POST request with valid endpoint and data, and resolve with the API response', async () => {
      // This test ensures that post calls ApiMethods.postHandler with correct arguments and resolves with the expected response.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/test-endpoint';
      const data = { foo: 'bar' };
      const apiResponse = { success: true, id: 123 };

      // Spy on Config constructor to inject our mockConfig
      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      // Set up the mock for postHandler
      mockedPostHandler.mockResolvedValue(apiResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      // @ts-ignore - forcibly inject our mockConfig
      apiManager['config'] = mockConfig;

      const result = await apiManager.post(endpoint, data);

      expect(mockedPostHandler).toHaveBeenCalledTimes(1);
      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
      expect(result).toEqual(apiResponse);

      configSpy.mockRestore();
    });

    it('should work with different data types in the data parameter', async () => {
      // This test ensures that post works with various data types (object, array, string, number).
      const baseUrl = 'http://example.com/api';
      const headers = { 'Accept': 'application/json' };
      const endpoint = '/multi-type';
      const dataVariants = [
        { input: { a: 1 }, output: { ok: true } },
        { input: [1, 2, 3], output: { ok: true } },
        { input: 'string-data', output: { ok: true } },
        { input: 42, output: { ok: true } },
      ];

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      for (const { input, output } of dataVariants) {
        mockedPostHandler.mockResolvedValueOnce(output as any as never);
        const result = await apiManager.post(endpoint, input);
        expect(mockedPostHandler).toHaveBeenLastCalledWith(endpoint, input, mockConfig);
        expect(result).toEqual(output);
      }

      configSpy.mockRestore();
    });

    it('should allow multiple consecutive post calls with different endpoints and data', async () => {
      // This test ensures that multiple post calls work independently and correctly.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Authorization': 'Bearer token' };
      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      const calls = [
        { endpoint: '/a', data: { x: 1 }, response: { r: 1 } },
        { endpoint: '/b', data: { y: 2 }, response: { r: 2 } },
      ];

      mockedPostHandler
        .mockResolvedValueOnce(calls[0].response as any as never)
        .mockResolvedValueOnce(calls[1].response as any as never);

      const result1 = await apiManager.post(calls[0].endpoint, calls[0].data);
      const result2 = await apiManager.post(calls[1].endpoint, calls[1].data);

      expect(mockedPostHandler).toHaveBeenNthCalledWith(1, calls[0].endpoint, calls[0].data, mockConfig);
      expect(mockedPostHandler).toHaveBeenNthCalledWith(2, calls[1].endpoint, calls[1].data, mockConfig);
      expect(result1).toEqual(calls[0].response);
      expect(result2).toEqual(calls[1].response);
    });
  });

  // =========================
  // Edge Case Tests
  // =========================
  describe('Edge cases', () => {
    it('should throw if ApiMethods.postHandler rejects with an error', async () => {
      // This test ensures that post properly propagates errors from postHandler.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/error-case';
      const data = { fail: true };
      const error = new Error('Network error');

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      mockedPostHandler.mockRejectedValue(error as never);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      await expect(apiManager.post(endpoint, data)).rejects.toThrow('Network error');
      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);

      configSpy.mockRestore();
    });

    it('should handle empty string endpoint', async () => {
      // This test ensures that post can handle an empty string as the endpoint.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '';
      const data = { test: 'empty' };
      const apiResponse = { ok: true };

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      mockedPostHandler.mockResolvedValue(apiResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      const result = await apiManager.post(endpoint, data);

      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
      expect(result).toEqual(apiResponse);

      configSpy.mockRestore();
    });

    it('should handle empty object as data', async () => {
      // This test ensures that post can handle an empty object as the data parameter.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/empty-data';
      const data = {};
      const apiResponse = { ok: true };

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      mockedPostHandler.mockResolvedValue(apiResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      const result = await apiManager.post(endpoint, data);

      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
      expect(result).toEqual(apiResponse);

      configSpy.mockRestore();
    });

    it('should handle large data payloads', async () => {
      // This test ensures that post can handle large data payloads.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/large-payload';
      const data = { arr: Array.from({ length: 10000 }, (_, i) => i) };
      const apiResponse = { ok: true };

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      mockedPostHandler.mockResolvedValue(apiResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      const result = await apiManager.post(endpoint, data);

      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
      expect(result).toEqual(apiResponse);

      configSpy.mockRestore();
    });

    it('should handle special characters in endpoint', async () => {
      // This test ensures that post can handle endpoints with special characters.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/weird/!@#$%^&*()_+-={}[]|;:\'",.<>?`~';
      const data = { test: 'special' };
      const apiResponse = { ok: true };

      const configSpy = jest.spyOn(require('../../../src/entities/Config'), 'default').mockImplementation(() => mockConfig);

      mockedPostHandler.mockResolvedValue(apiResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });
      // @ts-ignore
      apiManager['config'] = mockConfig;

      const result = await apiManager.post(endpoint, data);

      expect(mockedPostHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
      expect(result).toEqual(apiResponse);

      configSpy.mockRestore();
    });
  });
});