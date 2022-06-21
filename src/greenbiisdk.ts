import axios from "../node_modules/axios/index";
const GB_API_SERVER = "https://api.greenbii.com/sdk/v1"
import 'regenerator-runtime/runtime';

export type GreenbiiBusiness = {
    business_name: string,
    business_description: string
}

export type GreenbiiUser = {
    /** Name of the currently logged in user */
    name: string,
    email: string,
    /**The plan this user is subscribed to if available */
    plan_code?: string,
    id: string
}

export type connectOptions = {
    /**The API key you obtained from creating your app from the developer dashboard */
    api_key: string,
    /** The access token will be sent as a get request to the provided URL of your application */
    access_token: string
}

export type apiUserResponse = {
    /** Access token to be used to handle API call to the backend server */
    access_token: string,
    user: GreenbiiUser,
    business_details: GreenbiiBusiness,
    /** Operations allowed to be performed on the greenbii platform by this user */
    scope: string[]
}

export class greenbiisdk {
    constructor() {}

    
    async connect(config: connectOptions) {
        try {
            if(localStorage === undefined || window === undefined) {
                throw {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
            }
        }
        catch(e) {
            throw {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
        }

        if(typeof config.api_key === 'undefined') {
            throw {code: "NO_API_KEY", message: "API key no provided, unable to initialize Greenbii App Module"};
        }
    
        if(typeof config.access_token === 'undefined') {
            throw {code: "NO_ACCESS_TOKEN", message: "No access token is available for this request"};
        }

        if(localStorage.getItem("__gb_user") !== null) {
            const dt: apiUserResponse = JSON.parse(localStorage.getItem("__gb_user"));
            return dt;
        }

        try {
            const response =  await axios({url: GB_API_SERVER+"/initialize", method: "POST", data: {apiKey: config.api_key, access_token: config.access_token}})
            if(response.data.status === true) {
                const gb_user: apiUserResponse = response.data.data;
                return gb_user;
            }
            else {
                throw response.data.error;
            }
        }
        catch(err) {
            throw err;
        }

        /*if(response.data.status === true) {
                //it means the request was successful, notify the user user
                this.business_details = response.data.data.business_details;
                this.current_user_details = response.data.data.user;
                this.access_token = response.dara.data.access_token;
                //write the content of the file in storage
                localStorage.setItem("__gb_user", JSON.stringify(response.data.data));

                return true;
            }
            else {
                return false;
            }
        }).catch(error=>{
            console.log(error)
            return false;
        })*/
    }
}