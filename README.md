# greenbiisdk
The official Javascript SDK for the Greenbii Platform. This SDK tightly integrates into the frontend of any application to be listed on the Greenbii ERP platform.

## Development

Developers will need an API key to be generated after submitting their app to be listed on the Greenbii Platform. Visit `https://developer.greenbii.com/` for more info.

## Integrating

Run `npm install greenbiisdk -s` in your project folder.

## Usage
```js
    //import the sdk into your project
    import {greenbiisdk} from 'greenbiisdk';

    //create an instance of the SDK
    const greenbii = new greenbiisdk();

    //initialize the sdk with your API token and the request_access_token
    //received in the query parameter of your app url
    const param = new URLSearchParams(windows.location.search);
    greenbii.init(
        {access_token: params.get("request_access_token"), 
        api_key: <your_api_key>}
    ).then(status=>{
        if(status === true) {
            //do domething here
            //gets the currently logged in user
            greenbii.getCurrentUser();
            //get the business details of the currently logged in user
            greenbii.getBusinessDetails()
        }
        else {
            //this will log the reason why the request failed!
            console.log(greenbii.getStatusMessage())
        }
    })
```

## Fixes
Fixed type error in the response object received from the server on initialization.

## Need help?
Visit `https://developer.greenbii.com` for complete documentation.


