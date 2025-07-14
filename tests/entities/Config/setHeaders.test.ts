
import Config from '../../../src/entities/Config';


describe('Config.setHeaders() setHeaders method', () => {
    // Happy Paths

    it('should set headers to a non-empty object (happy path)', () => {
        // This test ensures that setHeaders correctly assigns a typical headers object.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'Authorization': 'Bearer token' } });
        const newHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    it('should set headers to an empty object (happy path)', () => {
        // This test ensures that setHeaders can handle an empty headers object.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'X-Test': 'test' } });
        const newHeaders = {};
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    it('should overwrite existing headers with new headers (happy path)', () => {
        // This test ensures that setHeaders overwrites any existing headers.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'X-Old': 'old' } });
        const newHeaders = { 'X-New': 'new' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    it('should set headers when initial headers are null (happy path)', () => {
        // This test ensures that setHeaders works when the initial headers are null.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: null });
        const newHeaders = { 'X-Header': 'value' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    // Edge Cases

    it('should set headers to null (edge case)', () => {
        // This test ensures that setHeaders can set headers to null as allowed by the method signature.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'X-Test': 'test' } });
        config.setHeaders(null);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toBeNull();
    });

    it('should set headers to an object with unusual but valid header names and values (edge case)', () => {
        // This test ensures that setHeaders can handle headers with unusual but valid names and values.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: {} });
        const newHeaders = { 'X-Üñîçødë': 'välüé', 'X-Empty': '', 'X-Space': ' ' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    it('should set headers to an object with a single header (edge case)', () => {
        // This test ensures that setHeaders works with a single header key-value pair.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'X-Old': 'old' } });
        const newHeaders = { 'X-Single': 'single-value' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });

    it('should set headers to an object with multiple headers having similar names (edge case)', () => {
        // This test ensures that setHeaders can handle headers with similar names.
        const config = new Config({ baseUrl: 'https://api.example.com', headers: {} });
        const newHeaders = { 'X-Test': '1', 'x-test': '2', 'X-TEST': '3' };
        config.setHeaders(newHeaders);
        // @ts-ignore: Accessing private property for test purposes
        expect((config as any).headers).toEqual(newHeaders);
    });
});