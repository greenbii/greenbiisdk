import 'regenerator-runtime/runtime';
export declare type GreenbiiBusiness = {
    business_name: string;
    business_description: string;
};
export declare type GreenbiiUser = {
    name: string;
    email: string;
    plan_code: string;
    id: string;
};
export declare type connectOptions = {
    /**The API key you obtained from creating your app from the developer dashboard */
    api_key: string;
    /** The access token will be sent as a get request to the provided URL of your application */
    access_token: string;
};
export declare type apiUserResponse = {
    access_token: string;
    user: GreenbiiUser;
    business_details: GreenbiiBusiness;
};
export declare class greenbiisdk {
    constructor();
    connect(config: connectOptions): Promise<apiUserResponse>;
}
