var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "../node_modules/axios/index";
const GB_API_SERVER = "https://api.greenbii.com/sdk/v1";
import 'regenerator-runtime/runtime';
export class greenbiisdk {
    constructor() { }
    connect(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (localStorage === undefined || window === undefined) {
                    throw { code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment" };
                }
            }
            catch (e) {
                throw { code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment" };
            }
            if (typeof config.api_key === 'undefined') {
                throw { code: "NO_API_KEY", message: "API key no provided, unable to initialize Greenbii App Module" };
            }
            if (typeof config.access_token === 'undefined') {
                throw { code: "NO_ACCESS_TOKEN", message: "No access token is available for this request" };
            }
            if (localStorage.getItem("__gb_user") !== null) {
                const dt = JSON.parse(localStorage.getItem("__gb_user"));
                return dt;
            }
            try {
                const response = yield axios({ url: GB_API_SERVER + "/initialize", method: "POST", data: { apiKey: config.api_key, access_token: config.access_token } });
                if (response.data.status === true) {
                    const gb_user = response.data.data;
                    return gb_user;
                }
                else {
                    throw response.data.error;
                }
            }
            catch (err) {
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
        });
    }
}
