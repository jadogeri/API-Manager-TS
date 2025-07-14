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
    static apiRequest(config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }, method: string, endpoint: string, body: object = {} ): Promise<object> {
        let baseUrl: string = config.getBaseUrl();
        let url: string = baseUrl + endpoint;
        console.log("url==========", url);
        let headers: Record<string, string> = config.getHeaders();
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
        });
    }

/**
     * Sends a GET request to the specified endpoint using the provided configuration.
     * @param endpoint - The API endpoint to send the request to.
     * @param config - An object containing methods to get the base URL and headers for the request.
     * @returns A promise that resolves to the response object from the API.
     * @throws TypeError if endpoint or config is undefined.
     */
    static getHandler(endpoint: string, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        if (endpoint === undefined || config === undefined) {
            throw new TypeError("endpoint or config cannot be undefined");
        }
        return this.apiRequest(config, 'GET', endpoint,undefined );
    }

/**
     * Retrieves data from the specified endpoint using the provided configuration.
     * @param endpoint - The API endpoint to fetch data from.
     * @param config - An object containing methods to get the base URL and headers.
     * @returns A promise that resolves to the response object.
     * @throws Error if the endpoint or config is undefined.
     */
    static putHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }

/**
 * Retrieves data from the specified endpoint using a GET request.
 * @param endpoint - The API endpoint to fetch data from.
 * @param config - Configuration object for the API request.
 * @returns A promise that resolves with the response data.
 * @throws TypeError if endpoint or config is undefined.
 */
    static postHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'POST', endpoint, data);        
    }

/**
 * Fetches data from the specified API endpoint using the provided configuration.
 * @param endpoint - The API endpoint to fetch data from.
 * @param config - An object containing methods to get the base URL and headers.
 * @returns A promise that resolves to the response object.
 * @throws Error if the fetch operation fails or if the response is not ok.
 */
    static patchHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }

/**
     * Sends a PUT request to the specified endpoint with the provided data and configuration.
     * @param endpoint - The URL to which the request is sent.
     * @param data - The data to be sent in the request body.
     * @param config - An object containing methods to get the base URL and headers for the request.
     * @returns A promise that resolves to the response object.
     * @throws Error if the endpoint or config is undefined.
     */
    static deleteHandler(endpoint:string , config:{getBaseUrl :() =>string ;getHeaders :() =>Record <string,string>} ):Promise <object>{
        return this.apiRequest(config,'DELETE',endpoint, undefined);        
    }
}

export default ApiMethods;