/**
 * @author      Joseph Adogeri
 * @since       13-JUL-2025
 * @version     1.0.0
 * @description Config class
 *  
 */

class Config {
    #baseUrl: string | null;
    #headers: Record<string, string> | null;

    constructor({ baseUrl = null, headers = null }: { baseUrl?: string | null; headers?: Record<string, string> | null }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    setBaseUrl(url: string | null): void {
        if (typeof url === 'string') {
            this.#baseUrl = url;
            return;
        } else if (url === null) {
            this.#baseUrl = url;
            return;
        } else if (url === undefined) {
            this.#baseUrl = url;
            return;
        } else {
            throw new TypeError("must be string ,null");
        }
    }

    getBaseUrl(): string | null {
        return this.#baseUrl;
    }

    setHeaders(headers: Record<string, string> | null): void {
        this.#headers = headers;
    }

    getHeaders(): Record<string, string> | null {
        return this.#headers;
    }

    instance(): { baseUrl: string | null; headers: Record<string, string> | null } {
        return {
            baseUrl: this.#baseUrl,
            headers: this.#headers
        };
    }
}

export default Config;