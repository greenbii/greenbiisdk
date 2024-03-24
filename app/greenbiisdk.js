const axios = require('axios');
const GB_API_SERVER = "https://api.greenbii.com/sdk/v1" //"http://localhost:8087/sdk/v1";  //"https://api.greenbii.com/v1"
//const isBrowser = require('./check_browser');



module.exports = function() {
    let status = false;
    let statusMessage = null;
    let business_details = null;
    let current_user_details = null;
    let access_token = null;

    /**
     * Initializes the greenbii platform object
     * @param {*} options {request_access_token|string, api_key|string} 
     * @returns Promise<boolea>
     */
    let connect = async function(options) {
        //console.log(localStorage.length);
        try {
            if(localStorage === undefined || window === undefined) {
                statusMessage = {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
                return false;
            }
        }
        catch(e) {
            statusMessage = {code: "UNSUPPORTED_PLATFORM", message: "Only browser platform is support for this SDK at the moment"};
            return false;
        }
        if(typeof options.api_key === 'undefined') {
            statusMessage = {code: "NO_API_KEY", message: "API key no provided, unable to initialize Greenbii App Module"}; return false;
        }
    
        if(typeof options.access_token === 'undefined') {
            statusMessage = {code: "NO_ACCESS_TOKEN", message: "No access token is available for this request"}; return false;
        }

        if(localStorage.getItem("__gb_user") !== null) {
            const dt = JSON.parse(localStorage.getItem("__gb_user"));
            this.access_token = dt.access_token;
            this.current_user_details = dt.user;
            this.business_details = dt.business_details;
            return true;
        }

        return axios({url: GB_API_SERVER+"/initialize", method: "POST", data: {apiKey: options.api_key, access_token: options.access_token}}).then(function(response){
            if(response.data.status === true) {
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
        })
    }

    /**
     * Retrieves the contacts this user has access to
     * provided your app is granted explicit permission
     */
    let getUserContacts = function() {
        if(this.access_token !== null) {
            
        }
        this.statusMessage = {code: "NO_VALID_ACCESS_TOKEN", message:"Cannot complete request, no valid access token"}
        this.status = false;
    }
}



module.exports = greenbiisdk;