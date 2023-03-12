# Nearpay SDK React Native Plugin For Android

Nearpay plugin for Android device payment using NFC. Plugin supported from
Minimum SDK version 21. This plugin will work based on
[Nearpay SDK](https://docs.nearpay.io/sdk/)

# Install plugin

``` javascript

npm install "https://github.com/nearpayio/nearpay-react-native-sdk.git#main" --save

Plugin will support minimum supported ANDROID SDK version 21 and above only.

```

# Usage

``` javascript

import * as Nearpay from 'react-native-nearpay-plugin';

```

# 1. Authentications

Authentication Types

- Login ( support both Email or Mobile user will chose )
- Email
- Mobile
- JWT

``` javascript
 Nearpay.AuthenticationType.login.values // If you want user to decide what will use to login email or mobile
 Nearpay.AuthenticationType.email.values // if you want restrict only email and you need to provide it to the auth value
 Nearpay.AuthenticationType.mobile.values // if you want restrict only mobile and you need to provide it to the auth value
 Nearpay.AuthenticationType.jwt.values // if you want restrict only jwt and you need to provide it to the auth value
```

### loggedin user information

``` javascript
var authType = Nearpay.AuthenticationType.email.values
var authValue = "youremail@email.com"
```


# 2. Initialize SDK

``` javascript

    var reqData = {
        "authtype" : authType, //Same as above reference
        "authvalue" : authValue, // Give auth type value
        "locale" : Nearpay.Locale.localeDefault, // [optional] locale reference
        "environment" : Nearpay.Environments.sandbox // [Required] environment reference
    };
    Nearpay.initialize(reqData).then((response) => {
        let resultJSON = JSON.parse(response)
        console.log(resultJSON.message,",,,,data....",resultJSON.status);
        if(resultJSON.status == 200){
            // Initialize Success with 200
        }else if(resultJSON.status == 204){
            // Initialize Failed with 204, Plugin iniyialize failed with null 
        }else if(resultJSON.status == 400){
            // Missing parameter Failed with 400, Authentication paramer missing Auth Type and Auth Value 
            // Auth type and Auth value missing
        }
    });
```

# 3. Setup 

``` javascript

    Nearpay.setup().then((response) => {
      var resultJSON = JSON.parse(response);
      if(resultJSON.status == 200){
        // Initialize Success with 200
      }else if(resultJSON.status == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
      }else if(resultJSON.status == 400){
        // Missing parameter Failed with 400, Authentication paramer missing Auth Type and Auth Value 
        // Auth type and Auth value missing
      }
    });

```

# 4. Purchase 

``` javascript

var reqData = {
      "amount": "0001", // [Required] ammount you want to set . 
      "customer_reference_number": "uuid()", // [optional] any number you want to add as a refrence Any string as a reference number
      "isEnableUI" : true, // [optional] true will enable the ui and false will disable
      "isEnableReversal" : true, // it will allow you to enable or disable the reverse button
      "finishTimeout" : 2  //[optional] Add the number of seconds
};

Nearpay.purchase(reqData).then((response) => {
    let resultJSON = JSON.parse(response);
    if(resultJSON.status == 200){
        // Initialize Success with 200
    }else if(resultJSON.status == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
    }else if(resultJSON.status == 400){
        // Missing parameter Failed with 400, Authentication paramer missing Auth Type and Auth Value 
        // Auth type and Auth value missing
        //Amount parameter null
    }
});


```

# 5. Refund 

``` javascript 


var reqData = {
      "amount": "0001", // [Required] ammount you want to set . 
      "transaction_uuid" :  purchaseReceipt.uuid,// [Required] add Transaction Reference Retrieval Number we need to pass from purchase response list contains uuid dict key "udid",  pass that value here.
      "customer_reference_number": "uuid()", // [optional] any number you want to add as a refrence Any string as a reference number
      "isEnableUI" : true,  // [optional] true will enable the ui and false will disable
      "isEnableReversal" : true, // it will allow you to enable or disable the reverse button
      "isEditableReversalUI" : true, // [optional] true will enable the ui and false will disable
      "finishTimeout" : 2,//[optional] Add the number of seconds
      "adminPin" : "0000", // [optional] when you add the admin pin here , the UI for admin pin won't be shown.

};

Nearpay.refund(reqData).then((response) => {
    let resultJSON = JSON.parse(response);
    if(resultJSON.status == 200){
        // Initialize Success with 200
    }else if(resultJSON.status == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
    }else if(resultJSON.status == 400){
        // Missing parameter Failed with 400, Authentication paramer missing Auth Type and Auth Value 
        // Auth type and Auth value missing
        // Amount parameter null
        // Transaction UUID null
    }
});


```

# 6. Reconcile 

``` javascript

var reqData = {
      "isEnableUI" : true, //[optional] true will enable the ui and false will disable 
      "finishTimeout" : 2, // [optional] Add the number of seconds
      "adminPin" : "0000" // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
};

Nearpay.refund(reqData).then((response) => {
    let resultJSON = JSON.parse(response);
    if(resultJSON.status == 200){
        // Initialize Success with 200
    }else if(resultJSON.status == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
    }
});


```

# 7. Reverse 

``` javascript

var reqData = {
      "isEnableUI" : true, //[optional] true will enable the ui and false will disable 
      "transaction_uuid" :purchaseReceipt.uuid, //[Required] add Transaction Reference Retrieval Number we need to pass from purchase response list contains uuid dict key "udid",  pass that value here.
      "finishTimeout" : 2 // [optional] Add the number of seconds
};

Nearpay.reverse(reqData).then((response) => {
    let resultJSON = JSON.parse(response);
    if(resultJSON.statu == 200){
        // Initialize Success with 200
    }else if(resultJSON.statu == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
    }else if(resultJSON.statu == 400){
        // Missing parameter Failed with 400, Authentication paramer missing Auth Type and Auth Value 
        // Auth type and Auth value missing
        // Transaction UUID null
    }
});    


```

# 8. Logout 

``` javascript
    Nearpay.logout().then((response) => {
        var resultJSON = JSON.parse(response);
        if(resultJSON.status == 200){

        }else{

        }
    });
```

### Response Status

``` Javascript 

General Response

200 :  Success
204 : Initiase Missing
400 : Invalid arguments
401 :  Authentication
402:  General Failure
403:  Failure Message
404: Invalid Status

Purchase Response

405:  Purchase Declined
406 : Purchase Rejected

Refund Response

407 : Refund Declined
408: Refund Rejected

Logout Response

409: User Already logout

Setup Response

410:  Already Installed
411 :  Not Installed

```

## Nearpay plugin response will be be in below formats

[Model Response](https://docs.nearpay.io/sdk/sdk-models)
