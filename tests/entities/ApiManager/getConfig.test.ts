
import ApiManager from '../../../src/entities/ApiManager';
import Config from "../../../src/entities/Config";

// src/entities/ApiManager.get.spec.ts
// Manual Jest mocks for dependencies


describe('ApiManager.getConfig getConfig method', () => {
  //
  // Happy Path Tests
  //
  describe('Happy paths', () => {

    test('should call ApiMethods.getConfig return with correct config object)', async () => {
      // This test ensures that getConfig works when baseUrl and headers are provided in ApiManager instance.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Authorization': 'Bearer token' }
      const config = new Config({baseUrl, headers})

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = apiManager.getConfig();

      expect(result).toStrictEqual(config);
    });

    test('should call ApiMethods.getConfig return with correct baseUrl provided)', async () => {
      // This test ensures that getConfig works when baseUrl and headers are provided in ApiManager instance.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Authorization': 'Bearer token' }

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = apiManager.getConfig().getBaseUrl();

      expect(result).toEqual(baseUrl);
      expect(result).toBeDefined();
      expect(result?.length).toBeGreaterThan(0);
    });

    test('should call ApiMethods.getConfig return with correct headers provided)', async () => {
      // This test ensures that getConfig works when baseUrl and headers are provided in ApiManager instance.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Authorization': 'Bearer token' }

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = apiManager.getConfig().getHeaders();

      expect(result).toEqual(headers);
      expect(result).toBeDefined();
    });
  });

  //
  // Edge Case Tests
  //
//   describe('Edge cases', () => {
//     test('should handle empty string endpoint', async () => {
//       // This test ensures that get can handle an empty string as the endpoint.
//       const endpoint = '';
//       const expectedResponse = { data: [] };

//       const apiManager = new ApiManager({ baseUrl: 'http://test' });
//       (apiManager as any).config = mockConfig;

//       (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

//       const result = await apiManager.get(endpoint);

//       expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
//       expect(result).toBe(expectedResponse);
//     });

//     test('should propagate rejection if ApiMethods.getHandler rejects', async () => {
//       // This test ensures that get propagates errors from ApiMethods.getHandler.
//       const endpoint = '/fail';
//       const error = new Error('Network error');

//       const apiManager = new ApiManager({ baseUrl: 'http://test' });
//       (apiManager as any).config = mockConfig;

//       (ApiMethods.getHandler as jest.Mock).mockRejectedValue(error as never);

//       await expect(apiManager.get(endpoint)).rejects.toThrow('Network error');
//       expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
//     });

//     test('should work with endpoints containing special characters', async () => {
//       // This test ensures that get works with endpoints that have special characters.
//       const endpoint = '/users/äöü-ß?param=✓';
//       const expectedResponse = { data: [{ id: 4, name: 'Special' }] };

//       const apiManager = new ApiManager({ baseUrl: 'http://test' });
//       (apiManager as any).config = mockConfig;

//       (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

//       const result = await apiManager.get(endpoint);

//       expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
//       expect(result).toBe(expectedResponse);
//     });

//     test('should work with very long endpoint strings', async () => {
//       // This test ensures that get works with very long endpoint strings.
//       const endpoint = '/'.padEnd(2048, 'a');
//       const expectedResponse = { data: 'long' };

//       const apiManager = new ApiManager({ baseUrl: 'http://test' });
//       (apiManager as any).config = mockConfig;

//       (ApiMethods.getHandler as jest.Mock).mockResolvedValue(expectedResponse as any as never);

//       const result = await apiManager.get(endpoint);

//       expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
//       expect(result).toBe(expectedResponse);
//     });
//   });
});