import Config from "../entities/Config";

/**
 * @author      Joseph Adogeri
 * @since       19-JUL-2025
 * @version     1.0.1
 * @description API Methods Class
 *  
 */
class ApiMethods {
/**
     * Sends an HTTP request to a specified endpoint using the provided configuration.
     * Returns a promise that resolves with the response data as an object.
     * 
     * @param config - An object containing methods to get the base URL and headers.
     * @param method - The HTTP method to use for the request (e.g., 'GET', 'POST').
     * @param endpoint - The endpoint to which the request is sent.
     * @param body - The request body to be sent (default is an empty object).
     * @returns A promise that resolves to the response data as an object.
     * @throws Will reject the promise if the fetch operation fails.
     */
    //static apiRequest(config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }, method: string, endpoint: string, body: object = {} ): Promise<object> {

    static apiRequest(config: Config , method: string, endpoint: string, body: undefined | object | string | object[]): Promise<object> {

        let baseUrl: string | null= config.getBaseUrl();
        let url: string = baseUrl + endpoint;
        let headers: Record<string, string> | null = config.getHeaders();

        if(body === undefined){
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: method,
                    headers: headers as HeadersInit,
                })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
            });

        }else{
            const data : string = typeof body != "string"? JSON.stringify(body) : body;
            
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: method,
                    headers: headers as HeadersInit,
                    body: data as BodyInit 
                })
                .then(res =>{ 
                    return res.json()})
                .then(resolve)
                .catch(reject);
            });
        }
    }

/**
     * Sends a GET request to the specified endpoint using the provided configuration.
     * @param endpoint - The API endpoint to send the request to.
     * @param config - An object containing methods to get the base URL and headers for the request.
     * @returns A promise that resolves to the response object from the API.
     * @throws TypeError if endpoint or config is undefined.
     */
    static getHandler(endpoint: string, config: Config ): Promise<object> {
        if (endpoint === undefined || config === undefined) {
            throw new TypeError("endpoint or config cannot be undefined");
        }
        return this.apiRequest(config, 'GET', endpoint,undefined );
    }

/**
     * Sends a PUT request to the specified endpoint with the provided data and configuration.
     * @param endpoint - The URL to which the request is sent.
     * @param data - The data to be sent in the request body.
     * @param config - An object containing methods to get the base URL and headers for the request.
     * @returns A promise that resolves to the response object.
     * @throws Error if the endpoint or config is undefined.
     */
    static putHandler(endpoint: string, data: object | object[] | string, config: Config): Promise<object> {
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }


/**
     * Sends a POST request to the specified endpoint with the provided data.
     * @param endpoint - The API endpoint to which the request is sent.
     * @param data - The data object to be sent in the request body.
     * @param config - Configuration options for the API request.
     * @returns A promise that resolves to the response object from the API.
     * @throws Will throw an error if the API request fails.
     */
    static postHandler(endpoint: string, data: object | object[] | string, config: Config): Promise<object> {
        return this.apiRequest(config, 'POST', endpoint, data);        
    }


/**
     * Sends a PATCH request to the specified endpoint with the provided data.
     * @param endpoint - The API endpoint to which the request is sent.
     * @param data - The data object to be sent in the request body.
     * @param config - Configuration options for the API request.
     * @returns A promise that resolves to the response object.
     * @throws Throws an error if the API request fails.
     */
    static patchHandler(endpoint: string, data: object | object[] | string, config: Config): Promise<object> {
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }

/**
     * Sends a DELETE request to the specified endpoint using the provided configuration.
     * @param endpoint - The API endpoint to send the DELETE request to.
     * @param config - The configuration object containing request settings.
     * @returns A promise that resolves to the response object.
     * @throws Throws an error if the API request fails.
     */
    static deleteHandler(endpoint:string , config: Config ):Promise <object>{
        if (endpoint === undefined || config === undefined) {
            throw new TypeError("endpoint or config cannot be undefined");
        }
        return this.apiRequest(config,'DELETE',endpoint, undefined);        
    }
}

export default ApiMethods;