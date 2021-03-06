const axios = require('axios');
const GB_API_SERVER = "http://localhost:8087/sdk/v1";  //"https://api.greenbii.com/v1"
//const isBrowser = require('./check_browser');


class greenbii {
    status = false;
    statusMessage = null;
    business_details = null;
    current_user_details = null;
    access_token = null;

    constructor(){
    }

    async init(options) {
        //console.log(localStorage.length);
        console.log(typeof options.access_token);
        try {
            if(localStorage === undefined || window === undefined) {
                this.statusMessage = {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
                return false;
            }
        }
        catch(e) {
            this.statusMessage = {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
            return false;
        }
        console.log(options);
        if(typeof options.api_key === 'undefined') {
            this.statusMessage = {code: "NO_API_KEY", message: "API key no provided, unable to initialize Greenbii App Module"}; return false;
        }
    
        if(typeof options.access_token === 'undefined') {
             this.statusMessage = {code: "NO_ACCESS_TOKEN", message: "No access token is available for this request"}; return false;
        }

        if(localStorage.getItem("__gb_user") !== null) {
            const dt = JSON.parse(localStorage.getItem("__gb_user"));
            this.access_token = dt.access_token;
            this.current_user_details = dt.user;
            this.business_details = dt.business_details;
            return true;
        }

        return axios({url: GB_API_SERVER+"/initialize", method: "POST", data: {apiKey: options.api_key, access_token: options.access_token}}).then(response=>{
            if(response.data.status === true) {
                //it means the request was successful, notify the user user
                this.business_details = response.data.data.business_details;
                this.current_user_details = response.data.data.user;
                this.access_token = response.data.data.access_token;
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
        })
    }

    //initialize gb app integration module here
    getCurrentUser() {
        return this.current_user_details;
    }

    /**
     * Returns the business details of the currently logged in user
     * @returns {business_name|string, business_description|string}
     */
    getCurrentBusinessData() {
        return this.business_details;
    }

    /**
     * Returns status message for every failed or successful
     * @returns {error|string, error_message|string}
     */
    getStatusMessage() {
        return this.statusMessage;
    }

    /**
     * Retrieves the contacts this user has access to
     * provided your app is granted explicit permission
     */
    getUserContacts() {
        if(this.access_token !== null) {
            return axios({url: GB_API_SERVER+"/user-contacts", method: "POST", data: {access_token: this.access_token}}).then(response=>{
                if(response.data.status === true) {
                    return response.data.data;
                }
                else {
                    return response.data;
                }
            }).catch(error=>{
                console.log(error)
                return {status: false, msg: null};
            })
        }
        else {
            return {status: false, code: "NO_VALID_ACCESS_TOKEN", message:"Cannot complete request, no valid access token"}
        }
    }

    /**
     * Retrieves all the files this user has access to
     * provided your app is granted explicit permission
     */
    getUserFiles() {
        if(this.access_token !== null) {
            return axios({url: GB_API_SERVER+"/user-files", method: "POST", data: {access_token: this.access_token}}).then(response=>{
                if(response.data.status === true) {
                    return response.data.data;
                }
                else {
                    return response.data;
                }
            }).catch(error=>{
                console.log(error)
                return {status: false, msg: null};
            })
        }
        else {
            return {status: false, code: "NO_VALID_ACCESS_TOKEN", message:"Cannot complete request, no valid access token"}
        }
    }
}



exports.greenbiisdk = greenbii;