
import Config from '../../../src/entities/Config';


describe('Config.getBaseUrl() getBaseUrl method', () => {
    // Happy Paths
    describe('Happy paths', () => {
        it('should return the baseUrl when a valid baseUrl is provided in the constructor', () => {
            // This test ensures getBaseUrl returns the correct string when baseUrl is set
            const config = new Config({ baseUrl: 'https://api.example.com' });
            expect(config.getBaseUrl()).toBe('https://api.example.com');
        });

        it('should return the baseUrl when baseUrl is an empty string', () => {
            // This test ensures getBaseUrl returns an empty string if that is what was set
            const config = new Config({ baseUrl: '' });
            expect(config.getBaseUrl()).toBe('');
        });

        it('should return the baseUrl when baseUrl contains special characters', () => {
            // This test ensures getBaseUrl handles special characters in the baseUrl
            const specialUrl = 'https://api.example.com/v1/resource?query=param&another=1#hash';
            const config = new Config({ baseUrl: specialUrl });
            expect(config.getBaseUrl()).toBe(specialUrl);
        });

        it('should return the baseUrl when baseUrl is a localhost URL', () => {
            // This test ensures getBaseUrl works with localhost URLs
            const config = new Config({ baseUrl: 'http://localhost:3000' });
            expect(config.getBaseUrl()).toBe('http://localhost:3000');
        });

        it('should return the baseUrl when baseUrl is an IP address', () => {
            // This test ensures getBaseUrl works with IP address URLs
            const config = new Config({ baseUrl: 'http://127.0.0.1:8080' });
            expect(config.getBaseUrl()).toBe('http://127.0.0.1:8080');
        });
    });

    // Edge Cases
    describe('Edge cases', () => {
        it('should return null when baseUrl is not provided in the constructor', () => {
            // This test ensures getBaseUrl returns null if baseUrl is omitted
            const config = new Config({});
            expect(config.getBaseUrl()).toBeNull();
        });

        it('should return null when baseUrl is explicitly set to null', () => {
            // This test ensures getBaseUrl returns null if baseUrl is explicitly set to null
            const config = new Config({ baseUrl: null });
            expect(config.getBaseUrl()).toBeNull();
        });

        it('should return null when baseUrl is undefined', () => {
            // This test ensures getBaseUrl returns null if baseUrl is explicitly set to undefined
            const config = new Config({ baseUrl: undefined });
            expect(config.getBaseUrl()).toBeNull();
        });

        it('should not be affected by headers property', () => {
            // This test ensures getBaseUrl is not affected by the headers property
            const config = new Config({ baseUrl: 'https://api.example.com', headers: { 'X-Test': 'value' } });
            expect(config.getBaseUrl()).toBe('https://api.example.com');
        });

        it('should return null when both baseUrl and headers are omitted', () => {
            // This test ensures getBaseUrl returns null if both baseUrl and headers are omitted
            const config = new Config({});
            expect(config.getBaseUrl()).toBeNull();
        });
    });
});