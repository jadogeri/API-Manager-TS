/**
 * @author      Joseph Adogeri
 * @since       13-JUL-2025
 * @version     1.0.0
 * @description Config class
 *  
 */

class Config {
    private baseUrl: string | null;
    private headers: Record<string, string> | null;

    constructor({ baseUrl = null, headers = null }: { baseUrl?: string | null; headers?: Record<string, string> | null }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

/**
     * Sets the base URL for the instance. Accepts a string or null.
     * If the input is not a string or null, a TypeError is thrown.
     * 
     * @param url - The base URL to set, which can be a string .
     * @returns void
     * @throws TypeError if the input is neither a string .
     */
    setBaseUrl(url: string | null ): void {        
        if (typeof url !== 'string' && url !== null) {
            throw new TypeError("url must be a string or null");
        } else {
            this.baseUrl = url;
        }
    }

/**
     * Retrieves the base URL for the current instance.
     * 
     * @returns {string | null} The base URL if set, otherwise null.
     * @throws No exceptions are thrown by this function.
     */
    getBaseUrl(): string | null {
        return this.baseUrl;
    }

/**
     * Sets the headers for the current instance.
     * @param headers - An object containing key-value pairs of headers, or null to clear headers.
     * @returns void
     * @throws None
     */
    setHeaders(headers: Record<string, string> | null): void {
        this.headers = headers;
    }

/**
     * Retrieves the headers associated with the current instance.
     * Returns a record of header key-value pairs or null if no headers are set.
     * 
     * @returns {Record<string, string> | null} The headers or null.
     * @throws No exceptions are thrown.
     */
    getHeaders(): Record<string, string> | null {
        return this.headers;
    }

/**
     * Retrieves the current configuration settings including the base URL and headers.
     * 
     * @returns An object containing the baseUrl and headers, both of which can be null.
     * @throws No exceptions are thrown by this function.
     */
    instance(): { baseUrl: string | null; headers: Record<string, string> | null } {
        return {
            baseUrl: this.baseUrl,
            headers: this.headers
        };
    }
}

export default Config;