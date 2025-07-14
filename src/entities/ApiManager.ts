import Config from "./Config.js";
import ApiMethods from "../helpers/ApiMethods";

/**
 * @author      Joseph Adogeri
 * @since       14-JUL-2025
 * @version     1.0.3
 * @description API Manager Class
 *  
 */
class ApiManager {
    private config: Config;

    constructor({ baseUrl = null, headers = null }: { baseUrl?: string | null; headers?: Record<string, string> | null }) {
        this.config = new Config({
            baseUrl: baseUrl,
            headers: headers
        });
    }

    getConfig = (): Config => {
        return this.config;
    }

    setConfig = (config: Config): void => {
        this.config = config;
    }

    updateHeader = (headers: Record<string, string>): void => {
        this.config.setHeaders(headers);
    }

    updateBaseUrl = (baseUrl: string): void => {
        this.config.setBaseUrl(baseUrl);
    }

/**
     * Returns the current instance of the ApiManager.
     * 
     * @returns {ApiManager} The current instance of the ApiManager.
     * @throws {None} This function does not throw any exceptions.
     */
    instance(): ApiManager {
        return this;
    }

/**
 * Retrieves the current instance of the ApiManager.
 * This function does not take any parameters and is used to access the singleton instance.
 * @returns {ApiManager} The current instance of the ApiManager.
 * @throws {None}
 */
    get(endpoint: string): Promise<any> {
        return ApiMethods.getHandler(endpoint, this.config);
    }

/**
 * Retrieves the current instance of the ApiManager.
 * This function does not take any parameters and always returns the current instance.
 * It does not throw any exceptions.
 */
    put(endpoint: string, data: any): Promise<any> {
        return ApiMethods.putHandler(endpoint, data, this.config);
    }  

/**
 * Retrieves the singleton instance of the ApiManager.
 * This function does not take any parameters and ensures that only one instance exists.
 * @returns {ApiManager} The singleton instance of the ApiManager.
 * @throws {Error} If the instance cannot be created.
 */
    patch(endpoint: string, data: any): Promise<any> {
        return ApiMethods.patchHandler(endpoint, data, this.config);
    }

/**
     * Sends a GET request to the specified API endpoint.
     * @param {string} endpoint - The API endpoint to send the request to.
     * @returns {Promise<any>} A promise that resolves with the response data.
     * @throws {None}
     */
/**
     * Sends a GET request to the specified API endpoint.
     * @param {string} endpoint - The API endpoint to send the request to.
     * @returns {Promise<any>} A promise that resolves with the response data.
     * @throws {None}
     */
    post(endpoint: string, data: any): Promise<any> {
        return ApiMethods.postHandler(endpoint, data, this.config);   
    }

/**
 * Retrieves the current instance of the ApiManager.
 * @param endpoint - The API endpoint to be accessed.
 * @param config - Configuration settings for the API request.
 * @returns The current instance of the ApiManager.
 * @throws Throws an error if the endpoint is invalid or if the configuration is incorrect.
 */
    delete(endpoint: string): Promise<any> {
        return ApiMethods.deleteHandler(endpoint, this.config);
    }
}

export default ApiManager;