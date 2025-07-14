
import Config from '../../../src/entities/Config';


describe('Config.instance() instance method', () => {
    // Happy Paths
    describe('Happy Paths', () => {
        it('should return the correct baseUrl and headers when both are provided', () => {
            // This test ensures that instance returns the correct values when both baseUrl and headers are set.
            const config = new Config({ baseUrl: 'https://api.example.com', headers: { Authorization: 'Bearer token' } });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: 'https://api.example.com',
                headers: { Authorization: 'Bearer token' }
            });
        });

        it('should return the correct baseUrl and null headers when only baseUrl is provided', () => {
            // This test ensures that instance returns the correct baseUrl and null headers when only baseUrl is set.
            const config = new Config({ baseUrl: 'https://api.example.com' });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: 'https://api.example.com',
                headers: null
            });
        });

        it('should return null baseUrl and correct headers when only headers are provided', () => {
            // This test ensures that instance returns null baseUrl and correct headers when only headers are set.
            const config = new Config({ headers: { 'X-Custom': 'value' } });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: null,
                headers: { 'X-Custom': 'value' }
            });
        });

        it('should return null baseUrl and null headers when neither is provided', () => {
            // This test ensures that instance returns null for both baseUrl and headers when neither is set.
            const config = new Config({});
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: null,
                headers: null
            });
        });

        it('should return the correct baseUrl and headers when both are explicitly set to null', () => {
            // This test ensures that instance returns null for both baseUrl and headers when both are explicitly set to null.
            const config = new Config({ baseUrl: null, headers: null });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: null,
                headers: null
            });
        });
    });

    // Edge Cases
    describe('Edge Cases', () => {
        it('should handle empty string as baseUrl', () => {
            // This test ensures that instance returns an empty string for baseUrl if it is set as such.
            const config = new Config({ baseUrl: '', headers: { Accept: 'application/json' } });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: '',
                headers: { Accept: 'application/json' }
            });
        });

        it('should handle empty headers object', () => {
            // This test ensures that instance returns an empty object for headers if it is set as such.
            const config = new Config({ baseUrl: 'https://api.example.com', headers: {} });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: 'https://api.example.com',
                headers: {}
            });
        });

        it('should handle headers with multiple key-value pairs', () => {
            // This test ensures that instance returns all key-value pairs in headers correctly.
            const headers = { Accept: 'application/json', Authorization: 'Bearer token', 'X-Test': 'test' };
            const config = new Config({ baseUrl: 'https://api.example.com', headers });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: 'https://api.example.com',
                headers
            });
        });

        it('should handle headers with special characters in keys and values', () => {
            // This test ensures that instance correctly handles headers with special characters.
            const headers = { 'X-Üñîçødë': 'välüé', 'X-Space Key': 'space value' };
            const config = new Config({ baseUrl: 'https://api.example.com', headers });
            const result = config.instance();
            expect(result).toEqual({
                baseUrl: 'https://api.example.com',
                headers
            });
        });
    });
});