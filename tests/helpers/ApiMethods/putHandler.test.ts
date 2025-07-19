
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.putHandler.spec.ts
// Mock global fetch
const globalAny: any = global;
beforeEach(() => {
  globalAny.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

const mockConfig = {
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
} as unknown as jest.Mocked<Config>;

describe('ApiMethods.putHandler() putHandler method', () => {
  //
  // Happy Path Tests
  //
  describe('Happy paths', () => {
    it('should send a PUT request with correct URL, headers, and body, and resolve with response data', async () => {
      // This test ensures putHandler sends a PUT request with the expected parameters and resolves with the correct response.
      const endpoint = '/test-endpoint';
      const data = { foo: 'bar' };
      const baseUrl = 'https://api.example.com';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { success: true };

      // Mock Config
      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      // Mock fetch
      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers,
          body: JSON.stringify(data) as any,
        })
      );
      expect(result).toEqual(responseData);
    });

    it('should work with empty object as data', async () => {
      // This test ensures putHandler works when data is an empty object.
      const endpoint = '/empty-body';
      const data = {};
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Test': '1' };
      const responseData = { ok: true };

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers,
          body: JSON.stringify(data) as any,
        })
      );
      expect(result).toEqual(responseData);
    });

    it('should work with string as data', async () => {
      // This test ensures putHandler works when data is a string.
      const endpoint = '/string-body';
      const data = '{"foo":"bar"}';
      const baseUrl = 'https://api.example.com';
      const headers = { 'Content-Type': 'application/json' };
      const responseData = { received: true };

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers,
          body: data as any,
        })
      );
      expect(result).toEqual(responseData);
    });

    it('should work when headers are empty object', async () => {
      // This test ensures putHandler works when headers are an empty object.
      const endpoint = '/no-headers';
      const data = { foo: 'bar' };
      const baseUrl = 'https://api.example.com';
      const headers = {};
      const responseData = { ok: 1 };

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers,
          body: JSON.stringify(data) as any,
        })
      );
      expect(result).toEqual(responseData);
    });
  });

  //
  // Edge Case Tests
  //
  describe('Edge cases', () => {
    it('should throw if fetch rejects (network error)', async () => {
      // This test ensures putHandler propagates fetch errors.
      const endpoint = '/error';
      const data = { foo: 'bar' };
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Test': 'fail' };
      const error = new Error('Network error');

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      globalAny.fetch = jest.fn().mockRejectedValue(error);

      await expect(ApiMethods.putHandler(endpoint, data, mockConfig)).rejects.toThrow('Network error');
    });

    it('should throw if response.json rejects (invalid JSON)', async () => {
      // This test ensures putHandler propagates errors from response.json().
      const endpoint = '/bad-json';
      const data = { foo: 'bar' };
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Test': 'fail' };
      const error = new Error('Invalid JSON');

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockRejectedValue(error);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      await expect(ApiMethods.putHandler(endpoint, data, mockConfig)).rejects.toThrow('Invalid JSON');
    });

    it('should handle when getBaseUrl returns empty string', async () => {
      // This test ensures putHandler works when getBaseUrl returns an empty string.
      const endpoint = '/empty-base';
      const data = { foo: 'bar' };
      const baseUrl = '';
      const headers = { 'X-Test': 'empty' };
      const responseData = { ok: true };

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers,
          body: JSON.stringify(data) as any,
        })
      );
      expect(result).toEqual(responseData);
    });

    it('should handle when getHeaders returns null', async () => {
      // This test ensures putHandler works when getHeaders returns null.
      const endpoint = '/null-headers';
      const data = { foo: 'bar' };
      const baseUrl = 'https://api.example.com';
      const headers = null;
      const responseData = { ok: true };

      mockConfig.getBaseUrl = jest.fn().mockReturnValue(baseUrl);
      mockConfig.getHeaders = jest.fn().mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      globalAny.fetch = jest.fn().mockResolvedValue({ json: mockJson });

      const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        expect.objectContaining({
          method: 'PUT',
          headers: headers as any,
          body: JSON.stringify(data) as any,
        })
      );
      expect(result).toEqual(responseData);
    });
  });
});