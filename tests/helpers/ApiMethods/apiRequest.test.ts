
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.test.ts
// Mock global fetch
const globalAny: any = global;
const mockFetch = jest.fn();
globalAny.fetch = mockFetch;

const mockConfig = {
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
} as unknown as jest.Mocked<Config>;

describe('ApiMethods.apiRequest() apiRequest method', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //
  // Happy Path Tests
  //
  describe('Happy Paths', () => {
    test('should send a GET request without body and resolve with response data', async () => {
      // This test ensures apiRequest works for GET requests with no body.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { id: 1, name: 'John' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should send a POST request with object body and resolve with response data', async () => {
      // This test ensures apiRequest works for POST requests with an object body.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify({ name: 'Alice' });
      const responseData = { id: 2, name: 'Alice' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'POST', endpoint, body);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'POST',
          headers,
          body,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should send a PUT request with string body and resolve with response data', async () => {
      // This test ensures apiRequest works for PUT requests with a string body.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users/1';
      const headers = { 'Content-Type': 'application/json' };
      const body = '{"name":"Bob"}';
      const responseData = { id: 1, name: 'Bob' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'PUT', endpoint, body);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'PUT',
          headers,
          body,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should send a DELETE request without body and resolve with response data', async () => {
      // This test ensures apiRequest works for DELETE requests with no body.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users/1';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { success: true };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'DELETE', endpoint, undefined);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'DELETE',
          headers,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should handle headers returned as null', async () => {
      // This test ensures apiRequest works when getHeaders returns null.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const responseData = { id: 3, name: 'Charlie' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(null);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers: null,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });
  });

  //
  // Edge Case Tests
  //
  describe('Edge Cases', () => {
    test('should reject if fetch throws an error (network error)', async () => {
      // This test ensures apiRequest rejects if fetch throws an error.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const headers = { Authorization: 'Bearer token' };
      const fetchError = new Error('Network error');

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      mockFetch.mockRejectedValue(fetchError as never);

      await expect(
        ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined)
      ).rejects.toThrow('Network error');

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
    });

    test('should reject if response.json throws an error', async () => {
      // This test ensures apiRequest rejects if response.json throws an error.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const headers = { Authorization: 'Bearer token' };
      const jsonError = new Error('Invalid JSON');

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockRejectedValue(jsonError as never);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      await expect(
        ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined)
      ).rejects.toThrow('Invalid JSON');

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(mockJson).toHaveBeenCalled();
    });

    test('should handle getBaseUrl returning an empty string', async () => {
      // This test ensures apiRequest works when getBaseUrl returns an empty string.
      const baseUrl = '';
      const endpoint = 'users';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { id: 4, name: 'Dana' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        endpoint,
        {
          method: 'GET',
          headers,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should handle endpoint as an empty string', async () => {
      // This test ensures apiRequest works when endpoint is an empty string.
      const baseUrl = 'https://api.example.com/';
      const endpoint = '';
      const headers = { Authorization: 'Bearer token' };
      const responseData = { status: 'ok' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'GET', endpoint, undefined);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl,
        {
          method: 'GET',
          headers,
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    test('should handle body as an empty object', async () => {
      // This test ensures apiRequest works when body is an empty object.
      const baseUrl = 'https://api.example.com/';
      const endpoint = 'users';
      const headers = { 'Content-Type': 'application/json' };
      const body = {};
      const responseData = { id: 5, name: 'Eve' };

      jest.mocked(mockConfig.getBaseUrl).mockReturnValue(baseUrl);
      jest.mocked(mockConfig.getHeaders).mockReturnValue(headers);

      const mockJson = jest.fn().mockResolvedValue(responseData as any);
      mockFetch.mockResolvedValue({ json: mockJson } as any);

      const result = await ApiMethods.apiRequest(mockConfig, 'POST', endpoint, body);

      expect(mockConfig.getBaseUrl).toHaveBeenCalled();
      expect(mockConfig.getHeaders).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        baseUrl + endpoint,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        }
      );
      expect(mockJson).toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });
  });
});