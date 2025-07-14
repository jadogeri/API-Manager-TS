
import Config from '../../../src/entities/Config';


describe('Config.setBaseUrl() setBaseUrl method', () => {
    // Happy Paths
    describe('Happy paths', () => {
        it('should set baseUrl to a valid string', () => {
            // This test ensures that setBaseUrl correctly sets baseUrl when provided a valid string.
            const config = new Config({ baseUrl: null, headers: null });
            config.setBaseUrl('https://example.com');
            // @ts-ignore: Accessing private property for test purposes
            expect((config as any).baseUrl).toBe('https://example.com');
        });

        it('should overwrite existing baseUrl with a new string', () => {
            // This test ensures that setBaseUrl overwrites an existing baseUrl value.
            const config = new Config({ baseUrl: 'https://old.com', headers: null });
            config.setBaseUrl('https://new.com');
            // @ts-ignore: Accessing private property for test purposes
            expect((config as any).baseUrl).toBe('https://new.com');
        });

        it('should set baseUrl to null when passed null', () => {
            // This test ensures that setBaseUrl sets baseUrl to null when passed null.
            const config = new Config({ baseUrl: 'https://example.com', headers: null });
            config.setBaseUrl(null);
            // @ts-ignore: Accessing private property for test purposes
            expect((config as any).baseUrl).toBeNull();
        });

    });

    // Edge Cases
    describe('Edge cases', () => {
        it('should set baseUrl to an empty string', () => {
            // This test ensures that setBaseUrl can handle an empty string as a valid input.
            const config = new Config({ baseUrl: 'https://example.com', headers: null });
            config.setBaseUrl('');
            // @ts-ignore: Accessing private property for test purposes
            expect((config as any).baseUrl).toBe('');
        });

        it('should set baseUrl to a string with only whitespace', () => {
            // This test ensures that setBaseUrl can handle a string containing only whitespace.
            const config = new Config({ baseUrl: 'https://example.com', headers: null });
            config.setBaseUrl('   ');
            // @ts-ignore: Accessing private property for test purposes
            expect((config as any).baseUrl).toBe('   ');
        });

        it('should throw TypeError when passed a number', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed a number.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl(123 as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl(123 as any)).toThrow('url must be a string or null');
        });

        it('should throw TypeError when passed a boolean', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed a boolean.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl(true as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl(true as any)).toThrow('url must be a string or null');
        });

        it('should throw TypeError when passed an object', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed an object.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl({} as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl({} as any)).toThrow('url must be a string or null');
        });

        it('should throw TypeError when passed an array', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed an array.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl(['https://example.com'] as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl(['https://example.com'] as any)).toThrow('url must be a string or null');
        });

        it('should throw TypeError when passed a function', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed a function.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl((() => 'https://example.com') as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl((() => 'https://example.com') as any)).toThrow('url must be a string or null');
        });

        it('should throw TypeError when passed a symbol', () => {
            // This test ensures that setBaseUrl throws a TypeError when passed a symbol.
            const config = new Config({ baseUrl: null, headers: null });
            expect(() => config.setBaseUrl(Symbol('url') as any)).toThrow(TypeError);
            expect(() => config.setBaseUrl(Symbol('url') as any)).toThrow('url must be a string or null');
        });
    });
});