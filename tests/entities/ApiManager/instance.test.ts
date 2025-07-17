
import ApiManager from '../../../src/entities/ApiManager';
import Config from "../../../src/entities/Config";


// src/entities/ApiManager.instance.spec.ts
// Manual Jest mock for Config class
const mockConfig = {
  setBaseUrl: jest.fn(),
  setHeaders: jest.fn(),
  getBaseUrl: jest.fn(),
  getHeaders: jest.fn(),
  instance: jest.fn(),
} as unknown as jest.Mocked<Config>;

// Helper to replace ApiManager's internal config with a mock
function injectMockConfig(apiManager: ApiManager, mock: jest.Mocked<Config>) {
  // @ts-ignore: Accessing private property for testing
  apiManager.config = mock;
}

describe('ApiManager.instance() instance method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    it('should return the same ApiManager instance (basic usage)', () => {
      // This test aims to verify that instance() returns the same object as the original ApiManager.
      const apiManager = new ApiManager({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance after calling setConfig', () => {
      // This test aims to ensure that instance() still returns the same object after setConfig is called.
      const apiManager = new ApiManager({ baseUrl: 'http://api.com', headers: { Accept: 'text/plain' } });
      apiManager.setConfig('http://newapi.com', { Authorization: 'Bearer token' });
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance after calling updateHeader', () => {
      // This test aims to ensure that instance() still returns the same object after updateHeader is called.
      const apiManager = new ApiManager({ baseUrl: 'http://api.com', headers: { Accept: 'text/plain' } });
      apiManager.updateHeader({ 'X-Test': 'true' });
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance after calling updateBaseUrl', () => {
      // This test aims to ensure that instance() still returns the same object after updateBaseUrl is called.
      const apiManager = new ApiManager({ baseUrl: 'http://api.com', headers: { Accept: 'text/plain' } });
      apiManager.updateBaseUrl('http://changed.com');
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance when config is replaced with a mock', () => {
      // This test aims to ensure that instance() still returns the same object even if the internal config is replaced with a mock.
      const apiManager = new ApiManager({ baseUrl: 'http://api.com', headers: { Accept: 'text/plain' } });
      injectMockConfig(apiManager, mockConfig);
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    it('should return the same instance when constructed with only baseUrl', () => {
      // This test aims to verify that instance() works when only baseUrl is provided.
      const apiManager = new ApiManager({ baseUrl: 'http://onlybaseurl.com' });
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance when constructed with only headers', () => {
      // This test aims to verify that instance() works when only headers are provided.
      const apiManager = new ApiManager({ headers: { 'X-Edge': 'case' } });
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance when constructed with empty object', () => {
      // This test aims to verify that instance() works when constructed with no baseUrl or headers.
      const apiManager = new ApiManager({});
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance when constructed with no arguments', () => {
      // This test aims to verify that instance() works when constructed with no arguments at all.
      // @ts-ignore: Testing constructor with no arguments
      const apiManager = new ApiManager();
      const result = apiManager.instance();
      expect(result).toBe(apiManager);
    });

    it('should return the same instance after multiple chained calls', () => {
      // This test aims to verify that repeated calls to instance() always return the same object.
      const apiManager = new ApiManager({ baseUrl: 'http://chain.com', headers: { 'X-Chain': 'true' } });
      const first = apiManager.instance();
      const second = apiManager.instance();
      const third = apiManager.instance();
      expect(first).toBe(apiManager);
      expect(second).toBe(apiManager);
      expect(third).toBe(apiManager);
    });
  });
});