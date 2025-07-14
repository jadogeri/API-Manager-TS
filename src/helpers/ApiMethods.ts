class ApiMethods {
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

    static getHandler(endpoint: string, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        if (endpoint === undefined || config === undefined) {
            throw new TypeError("endpoint or config cannot be undefined");
        }
        return this.apiRequest(config, 'GET', endpoint,undefined );
    }

    static putHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }

    static postHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'POST', endpoint, data);        
    }

    static patchHandler(endpoint: string, data: object, config: { getBaseUrl: () => string; getHeaders: () => Record<string, string> }): Promise<object> {
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }

    static deleteHandler(endpoint:string , config:{getBaseUrl :() =>string ;getHeaders :() =>Record <string,string>} ):Promise <object>{
        return this.apiRequest(config,'DELETE',endpoint, undefined);        
    }
}

export default ApiMethods;