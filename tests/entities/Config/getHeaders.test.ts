
import Config from '../../../src/entities/Config';


describe('Config.getHeaders() getHeaders method', () => {
    // Happy Paths
    describe('Happy paths', () => {
        it('should return the headers object when headers are provided in the constructor', () => {
            // Test: Ensure getHeaders returns the headers object when set
            const headers = { 'Authorization': 'Bearer token', 'Content-Type': 'application/json' };
            const config = new Config({ baseUrl: 'https://api.example.com', headers });
            expect(config.getHeaders()).toEqual(headers);
        });

        it('should return null when headers are not provided (default)', () => {
            // Test: Ensure getHeaders returns null if headers are not set in the constructor
            const config = new Config({ baseUrl: 'https://api.example.com' });
            expect(config.getHeaders()).toBeNull();
        });

        it('should return null when headers are explicitly set to null', () => {
            // Test: Ensure getHeaders returns null if headers are explicitly set to null
            const config = new Config({ baseUrl: 'https://api.example.com', headers: null });
            expect(config.getHeaders()).toBeNull();
        });

        it('should return the headers object when only headers are provided', () => {
            // Test: Ensure getHeaders returns the headers object when only headers are set
            const headers = { 'X-Custom-Header': 'value' };
            const config = new Config({ headers });
            expect(config.getHeaders()).toEqual(headers);
        });

        it('should return null when both baseUrl and headers are omitted', () => {
            // Test: Ensure getHeaders returns null if both baseUrl and headers are omitted
            const config = new Config({});
            expect(config.getHeaders()).toBeNull();
        });
    });

    // Edge Cases
    describe('Edge cases', () => {
        it('should return an empty object if headers is an empty object', () => {
            // Test: Ensure getHeaders returns an empty object if headers is set to {}
            const config = new Config({ headers: {} });
            expect(config.getHeaders()).toEqual({});
        });

        it('should handle headers with unusual but valid keys and values', () => {
            // Test: Ensure getHeaders returns headers with unusual keys/values
            const headers = { 'X-Empty': '', 'X-Space': ' ', 'X-Number': '123', 'X-Symbols': '!@#$%^&*()' };
            const config = new Config({ headers });
            expect(config.getHeaders()).toEqual(headers);
        });

        it('should not mutate the headers object after construction', () => {
            // Test: Ensure getHeaders returns the original headers even if the input object is mutated after construction
            const headers = { 'X-Test': 'initial' };
            const config = new Config({ headers });
            headers['X-Test'] = 'mutated';
            expect(config.getHeaders()).toEqual({ 'X-Test': 'mutated' }); // Because the reference is kept
        });

        it('should return the same headers object reference as provided in the constructor', () => {
            // Test: Ensure getHeaders returns the exact same object reference as provided
            const headers = { 'X-Ref': 'ref' };
            const config = new Config({ headers });
            expect(config.getHeaders()).toBe(headers);
        });
    });
});