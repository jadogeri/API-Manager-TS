import Config from "./Config.js";
import ApiMethods from "../helpers/ApiMethods";

/**
 * @author      Joseph Adogeri
 * @since       14-JUL-2025
 * @version     1.0.0
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
/**
     * Returns the current instance of the Config.
     * 
     * @returns {Config} The current instance of the Config.
     * @throws {None} This function does not throw any exceptions.
     */
    getConfig = (): Config => {
        return this.config;
    }

    /**
     * Sets the current configuration settings including the base URL and headers.
     * @param {string} baseUrl - The baseUrl of the configuration settings.
     * @param {Record<string, string>} headers - The headers of the configuration settings.
     * @returns {void} - This function does not return a value.
     * @throws {None} This function does not throw any exceptions.
     */
    setConfig = (baseUrl : string, headers : Record<string, string>): void => {
        this.config = new Config({baseUrl, headers});
    }

    /**
     * Sets the headers of the current configuration settings.
     * @param {Record<string, string>} headers - The headers of the configuration settings.
     * @returns {void} - This function does not return a value.
     * @throws {None} This function does not throw any exceptions.
     */
    updateHeader = (headers: Record<string, string>): void => {
        this.config.setHeaders(headers);
    }

    /**
     * Sets the baseUrl of the current configuration settings.
     * @param {string} baseUrl - The baseUrl of the configuration settings.
     * @returns {void} - This function does not return a value.
     * @throws {None} This function does not throw any exceptions.
     */
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
     * Sends a GET request to the specified API endpoint.
     * @param {string} endpoint - The API endpoint to send the request to.
     * @returns {Promise<any>} A promise that resolves with the response data.
     * @throws {None}
     */
    get(endpoint: string): Promise<any> {
        return ApiMethods.getHandler(endpoint, this.config);
    }

    put(endpoint: string, data: any): Promise<any> {
        return ApiMethods.putHandler(endpoint, data, this.config);
    }  

    patch(endpoint: string, data: any): Promise<any> {
        return ApiMethods.patchHandler(endpoint, data, this.config);
    }

    post(endpoint: string, data: any): Promise<any> {
        return ApiMethods.postHandler(endpoint, data, this.config);   
    }

    delete(endpoint: string): Promise<any> {
        return ApiMethods.deleteHandler(endpoint, this.config);
    }
}

export default ApiManager;