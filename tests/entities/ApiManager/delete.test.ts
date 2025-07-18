
import ApiManager from '../../../src/entities/ApiManager';
import Config from "../../../src/entities/Config";


// src/entities/ApiManager.delete.spec.ts
// Manual Jest mocks for dependencies
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

jest.mock("../../../src/entities/Config", () => {
  return jest.fn().mockImplementation(() => mockConfig);
});

const mockDeleteHandler = jest.fn();
jest.mock("../../../src/helpers/ApiMethods", () => ({
  __esModule: true,
  default: {
    deleteHandler: mockDeleteHandler,
  },
}));

describe('ApiManager.delete() delete method', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // Happy Path Tests
  // =========================
  describe('Happy paths', () => {
    test('should send a DELETE request to the correct endpoint and return the resolved response', async () => {
      // This test ensures that the delete method calls ApiMethods.deleteHandler with the correct arguments and returns its resolved value.
      const baseUrl = 'http://example.com/api';
      const headers = { 'Content-Type': 'application/json' };
      const endpoint = '/resource/123';
      const expectedResponse = { success: true, deleted: 123 };

      // Arrange
      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      // Act
      const result = await apiManager.delete(endpoint);

      // Assert
      expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });

    test('should work with different headers and endpoints', async () => {
      // This test checks that the delete method works with different header configurations and endpoints.
      const baseUrl = 'https://api.test.com';
      const headers = { Authorization: 'Bearer token' };
      const endpoint = '/users/42';
      const expectedResponse = { status: 'deleted', id: 42 };

      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.delete(endpoint);

      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });

    test('should allow multiple delete calls with different endpoints', async () => {
      // This test ensures that multiple calls to delete with different endpoints work as expected.
      const baseUrl = 'https://api.example.com';
      const headers = { 'X-Api-Key': 'abc123' };
      const endpoint1 = '/item/1';
      const endpoint2 = '/item/2';
      const response1 = { deleted: 1 };
      const response2 = { deleted: 2 };

      mockDeleteHandler
        .mockResolvedValueOnce(response1 as any as never)
        .mockResolvedValueOnce(response2 as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result1 = await apiManager.delete(endpoint1);
      const result2 = await apiManager.delete(endpoint2);

      expect(mockDeleteHandler).toHaveBeenNthCalledWith(1, endpoint1, mockConfig);
      expect(mockDeleteHandler).toHaveBeenNthCalledWith(2, endpoint2, mockConfig);
      expect(result1).toEqual(response1);
      expect(result2).toEqual(response2);
    });
  });

  // =========================
  // Edge Case Tests
  // =========================
  describe('Edge cases', () => {
    test('should throw an error if ApiMethods.deleteHandler rejects', async () => {
      // This test ensures that if the underlying deleteHandler throws, the error is propagated.
      const baseUrl = 'http://localhost:3000';
      const headers = { Accept: 'application/json' };
      const endpoint = '/fail-case';
      const error = new Error('Delete failed');

      mockDeleteHandler.mockRejectedValue(error as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      await expect(apiManager.delete(endpoint)).rejects.toThrow('Delete failed');
      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
    });

    test('should handle empty string endpoint', async () => {
      // This test checks that the delete method can handle an empty string as the endpoint.
      const baseUrl = 'http://localhost:4000';
      const headers = { 'X-Test': 'yes' };
      const endpoint = '';
      const expectedResponse = { result: 'no endpoint' };

      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.delete(endpoint);

      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });

    test('should work with special characters in endpoint', async () => {
      // This test ensures that endpoints with special characters are passed correctly.
      const baseUrl = 'http://localhost:5000';
      const headers = { 'X-Env': 'dev' };
      const endpoint = '/weird/!@#$%^&*()_+-=';
      const expectedResponse = { deleted: true };

      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.delete(endpoint);

      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });

    test('should work when headers are empty object', async () => {
      // This test checks that the delete method works when headers are provided as an empty object.
      const baseUrl = 'http://localhost:6000';
      const headers = {};
      const endpoint = '/empty-headers';
      const expectedResponse = { ok: true };

      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.delete(endpoint);

      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });

    test('should work when baseUrl is an empty string', async () => {
      // This test checks that the delete method works when baseUrl is an empty string.
      const baseUrl = '';
      const headers = { 'X-Empty': 'true' };
      const endpoint = '/empty-baseurl';
      const expectedResponse = { deleted: 'empty-baseurl' };

      mockDeleteHandler.mockResolvedValue(expectedResponse as any as never);

      const apiManager = new ApiManager({ baseUrl, headers });

      const result = await apiManager.delete(endpoint);

      expect(mockDeleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
      expect(result).toEqual(expectedResponse);
    });
  });
});