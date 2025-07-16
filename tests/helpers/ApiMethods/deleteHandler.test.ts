
import Config from "../../../src/entities/Config";
import ApiMethods from '../../../src/helpers/ApiMethods';


// src/helpers/ApiMethods.deleteHandler.spec.ts
// Jest mock for Config class

// Helper to reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('ApiMethods.deleteHandler() deleteHandler method', () => {
  //
  // Happy Path Tests
  //
  describe('Happy paths', () => {
    test('should call apiRequest with correct arguments and resolve with response (baseUrl and headers present)', async () => {
      // This test ensures that deleteHandler calls apiRequest with the correct parameters and resolves as expected.
      const endpoint = '/test-endpoint';
      const responseObj = { success: true };

      // Mock Config methods
      const config = {
        getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
        getHeaders: jest.fn().mockReturnValue({ Authorization: 'Bearer token' }),
      } as unknown as jest.Mocked<Config>;

      // Spy on apiRequest
      const apiRequestSpy = jest
        .spyOn(ApiMethods, 'apiRequest')
        .mockResolvedValue(responseObj as any as never);

      const result = await ApiMethods.deleteHandler(endpoint, config);

      expect(apiRequestSpy).toHaveBeenCalledWith(
        config,
        'DELETE',
        endpoint,
        undefined
      );
      expect(result).toBe(responseObj);

      apiRequestSpy.mockRestore();
    });

    test('should work when getBaseUrl returns empty string and getHeaders returns empty object', async () => {
      // This test checks that deleteHandler works when baseUrl is an empty string and headers is an empty object.
      const endpoint = '/empty';
      const responseObj = { deleted: true };

      const config = {
        getBaseUrl: jest.fn().mockReturnValue(''),
        getHeaders: jest.fn().mockReturnValue({}),
      } as unknown as jest.Mocked<Config>;

      const apiRequestSpy = jest
        .spyOn(ApiMethods, 'apiRequest')
        .mockResolvedValue(responseObj as any as never);

      const result = await ApiMethods.deleteHandler(endpoint, config);

      expect(apiRequestSpy).toHaveBeenCalledWith(
        config,
        'DELETE',
        endpoint,
        undefined
      );
      expect(result).toBe(responseObj);

      apiRequestSpy.mockRestore();
    });

    test('should work when getHeaders returns null', async () => {
      // This test checks that deleteHandler works when getHeaders returns null.
      const endpoint = '/null-headers';
      const responseObj = { ok: 1 };

      const config = {
        getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
        getHeaders: jest.fn().mockReturnValue(null),
      } as unknown as jest.Mocked<Config>;

      const apiRequestSpy = jest
        .spyOn(ApiMethods, 'apiRequest')
        .mockResolvedValue(responseObj as any as never);

      const result = await ApiMethods.deleteHandler(endpoint, config);

      expect(apiRequestSpy).toHaveBeenCalledWith(
        config,
        'DELETE',
        endpoint,
        undefined
      );
      expect(result).toBe(responseObj);

      apiRequestSpy.mockRestore();
    });

    test('should work when getBaseUrl returns null', async () => {
      // This test checks that deleteHandler works when getBaseUrl returns null.
      const endpoint = '/null-baseurl';
      const responseObj = { ok: 2 };

      const config = {
        getBaseUrl: jest.fn().mockReturnValue(null),
        getHeaders: jest.fn().mockReturnValue({ 'X-Test': '1' }),
      } as unknown as jest.Mocked<Config>;

      const apiRequestSpy = jest
        .spyOn(ApiMethods, 'apiRequest')
        .mockResolvedValue(responseObj as any as never);

      const result = await ApiMethods.deleteHandler(endpoint, config);

      expect(apiRequestSpy).toHaveBeenCalledWith(
        config,
        'DELETE',
        endpoint,
        undefined
      );
      expect(result).toBe(responseObj);

      apiRequestSpy.mockRestore();
    });
  });

  //
  // Edge Case Tests
  //
  describe('Edge cases', () => {
    test('should throw TypeError if endpoint is undefined', () => {
      // This test ensures that deleteHandler throws a TypeError if endpoint is undefined.
      const config = {
        getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
        getHeaders: jest.fn().mockReturnValue({}),
      } as unknown as jest.Mocked<Config>;

      expect(() =>
        ApiMethods.deleteHandler(undefined as unknown as string, config)
      ).toThrow(new TypeError('endpoint or config cannot be undefined'));
    });

    test('should throw TypeError if config is undefined', () => {
      // This test ensures that deleteHandler throws a TypeError if config is undefined.
      const endpoint = '/test';

      expect(() =>
        ApiMethods.deleteHandler(endpoint, undefined as unknown as Config)
      ).toThrow(new TypeError('endpoint or config cannot be undefined'));
    });

    test('should propagate error if apiRequest rejects', async () => {
      // This test ensures that if apiRequest rejects, the error is propagated.
      const endpoint = '/fail';
      const config = {
        getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
        getHeaders: jest.fn().mockReturnValue({}),
      } as unknown as jest.Mocked<Config>;

      const error = new Error('API failed');
      const apiRequestSpy = jest
        .spyOn(ApiMethods, 'apiRequest')
        .mockRejectedValue(error as never);

      await expect(ApiMethods.deleteHandler(endpoint, config)).rejects.toThrow(
        'API failed'
      );

      apiRequestSpy.mockRestore();
    });
  });
});