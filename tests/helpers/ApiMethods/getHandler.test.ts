
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.getHandler.spec.ts
// Mock global fetch
const globalAny: any = global;
beforeAll(() => {
  globalAny.fetch = jest.fn();
});
afterEach(() => {
  jest.clearAllMocks();
});

const mockConfig = {
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
} as unknown as jest.Mocked<Config>;

describe('ApiMethods.getHandler() getHandler method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    it('should send a GET request and resolve with response data (baseUrl and headers present)', async () => {
      // This test ensures getHandler works with valid endpoint and config, and fetch resolves as expected.
      const endpoint = '/test-endpoint';
      const baseUrl = 'https://api.example.com';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { success: true };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(mockConfig.getBaseUrl).toHaveBeenCalledTimes(1);
      expect(mockConfig.getHeaders).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });

    it('should work when headers are empty object', async () => {
      // This test ensures getHandler works when getHeaders returns an empty object.
      const endpoint = '/empty-headers';
      const baseUrl = 'https://api.example.com';
      const headers = {};
      const responseData = { data: 123 };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });

    it('should work when getBaseUrl returns an empty string', async () => {
      // This test ensures getHandler works when getBaseUrl returns an empty string.
      const endpoint = '/no-base';
      const baseUrl = '';
      const headers = { 'X-Test': '1' };
      const responseData = { ok: true };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });

    it('should work when getHeaders returns null', async () => {
      // This test ensures getHandler works when getHeaders returns null.
      const endpoint = '/null-headers';
      const baseUrl = 'https://api.example.com';
      const headers = null;
      const responseData = { foo: 'bar' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });

    it('should work when getBaseUrl returns null', async () => {
      // This test ensures getHandler works when getBaseUrl returns null.
      const endpoint = '/null-base';
      const baseUrl = null;
      const headers = { 'X-Null': 'yes' };
      const responseData = { nullBase: true };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'null' + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should throw TypeError if endpoint is undefined', () => {
      // This test ensures getHandler throws if endpoint is undefined.
      expect(() => {
        ApiMethods.getHandler(undefined as unknown as string, mockConfig);
      }).toThrow(new TypeError('endpoint or config cannot be undefined'));
    });

    it('should throw TypeError if config is undefined', () => {
      // This test ensures getHandler throws if config is undefined.
      expect(() => {
        ApiMethods.getHandler('/endpoint', undefined as unknown as Config);
      }).toThrow(new TypeError('endpoint or config cannot be undefined'));
    });

    it('should reject if fetch fails', async () => {
      // This test ensures getHandler rejects if fetch throws an error.
      const endpoint = '/fail-fetch';
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Fail': 'yes' };
      const fetchError = new Error('Network error');

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      globalAny.fetch.mockRejectedValue(fetchError as never);

      await expect(ApiMethods.getHandler(endpoint, mockConfig)).rejects.toThrow('Network error');
    });

    it('should reject if response.json() throws', async () => {
      // This test ensures getHandler rejects if response.json() throws an error.
      const endpoint = '/json-fail';
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Json': 'fail' };
      const jsonError = new Error('Invalid JSON');

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockRejectedValue(jsonError as never),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      await expect(ApiMethods.getHandler(endpoint, mockConfig)).rejects.toThrow('Invalid JSON');
    });

    it('should handle endpoint as empty string', async () => {
      // This test ensures getHandler works when endpoint is an empty string.
      const endpoint = '';
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Empty': 'yes' };
      const responseData = { empty: true };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const fetchResponse = {
        json: jest.fn().mockResolvedValue(responseData as any),
      };
      globalAny.fetch.mockResolvedValue(fetchResponse as any);

      const result = await ApiMethods.getHandler(endpoint, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl,
        {
          method: 'GET',
          headers,
        }
      );
      expect(result).toEqual(responseData);
    });
  });
});