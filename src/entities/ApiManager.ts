import Config from "./Config.js";
import ApiMethods from "../helpers/ApiMethods";

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

    instance(): ApiManager {
        return this;
    }

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