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

    /**
     * constructor to create new instance of ApiManager.
     * @param {string | null} baseUrl - The baseUrl of the configuration settings.
     * @param {Record<string, string> | null} headers - The headers of the configuration settings.
     */    
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

/**
     * Sends a PUT request to the specified endpoint with the provided data.
     * @param endpoint - The URL of the API endpoint to send the request to.
     * @param data - The data to be sent in the request body.
     * @returns A promise that resolves with the response from the API.
     * @throws Will throw an error if the request fails.
     */
    put(endpoint: string, data: any): Promise<any> {
        return ApiMethods.putHandler(endpoint, data, this.config);
    }  

/**
     * Sends a PATCH request to the specified endpoint with the provided data.
     * @param endpoint - The API endpoint to which the request is sent.
     * @param data - The data to be sent in the request body.
     * @returns A promise that resolves with the response from the API.
     * @throws ApiError if the request fails or the response is not successful.
     */
    patch(endpoint: string, data: any): Promise<any> {
        return ApiMethods.patchHandler(endpoint, data, this.config);
    }


/**
     * Sends a POST request to the specified endpoint with the provided data.
     * @param endpoint - The API endpoint to which the request is sent.
     * @param data - The data to be sent in the body of the request.
     * @returns A promise that resolves with the response from the API.
     * @throws Throws an error if the request fails or the response is not valid.
     */
    post(endpoint: string, data: any): Promise<any> {
        return ApiMethods.postHandler(endpoint, data, this.config);   
    }

/**
     * Sends a DELETE request to the specified endpoint using the configured API methods.
     * @param endpoint - The API endpoint to send the DELETE request to.
     * @returns A promise that resolves with the response from the API.
     * @throws Throws an error if the DELETE request fails.
     */
    delete(endpoint: string): Promise<any> {
        return ApiMethods.deleteHandler(endpoint, this.config);
    }
}

export default ApiManager;