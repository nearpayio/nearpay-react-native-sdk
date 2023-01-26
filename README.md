# Nearpay SDK React Native Plugin For Android

Nearpay plugin for Android device payment using NFC. Plugin supported from
Minimum SDK version 26. This plugin will work based on
[Nearpay SDK](https://docs.nearpay.io/sdk/)

# Install plugin

```bash
npm install react-native-nearpay-plugin
```

Please integrate plugin to a react native project either url or project, that will
share later.

```
Plugin will support minimum supported ANDROID SDK version 21 and above only.
```

# Import plugin library

```react-native

import * as nearpay from 'react-native-nearpay-plugin';

```

# Authentications

Authentication Types

1. Login ( support both Email or Mobile user will chose ) (AuthenticationType.login.values)
2. LoginWithEmail
3. LoginWithMobile
4. JWT

```
 nearpay.AuthenticationType.login
 nearpay.AuthenticationType.email
 nearpay.AuthenticationType.mobile
 nearpay.AuthenticationType.jwt

 var authType = nearpay.AuthenticationType.email
 var authValue = "yourmail@gmail.com"

```

# 1. Initialize SDK

```
Parameter details


1. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
2. Authentication input value
3. Locale deafult language : Locale.default
4. Environments availble are sandbox,testing,production :  Environments.sandbox


    var reqData = {
        "authtype" : authType, //Same as above reference
        "authvalue" : authValue, // Give auth type value
        "locale" : Locale.localeDefault, // [optional] locale reference
        "environment" : Environments.sandbox // [Required] environment reference
    };
    nearpay.initialize(reqData).then((response) => {
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

# 2. Setup 

```
Parameter details

1. AuthenticationType available are userenter,email,mobile,jwt : nearpay.AuthenticationType.email
2. Authentication input value

    var reqData = {
      "authtype" : authType, // [optional] Auth type we will pass here
      "authvalue" : authValue, // [optional] Auth value we will pass here
    };
    nearpay.setup(reqData).then((response) => {
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

# 3. Purchase 

```
Parameter Details

1. Amount for purchase
2. Customer referening number unique string
3. Enable Reciept UI enable : boolean parameter
4. Enable Reverse UI enable : boolean parameter
5. Timeout : timeout after

var reqData = {
      "amount": 0001, // [Required] ammount you want to set . 
      "customer_reference_number": "uuid()", // [optional] any number you want to add as a refrence Any string as a reference number
      "isEnableUI" : true, // [optional] true will enable the ui and false will disable
      "isEnableReversal" : true, // it will allow you to enable or disable the reverse button
      "finishTimeout" : 2  //[optional] Add the number of seconds
};

nearpay.purchase(reqData).then((response) => {
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

# 4. Refund 

```
Parameter Details

1. Amount for purchase
2. Transaction UUID from response - uuid
3. Customer referening number unique string
4. Enable UI enable : boolean parameter
5. Enable Reverse UI enable : boolean parameter
6. Is Editable refund UI enable : boolean parameter
7. Timeout : timeout after

var reqData = {
      "amount": 0001, // [Required] ammount you want to set . 
      "transaction_uuid" :  purchaseReceipt.uuid,// [Required] add Transaction Reference Retrieval Number we need to pass from purchase response list contains uuid dict key "udid",  pass that value here.
      "customer_reference_number": "uuid()", // [optional] any number you want to add as a refrence Any string as a reference number
      "isEnableUI" : true,  // [optional] true will enable the ui and false will disable
      "isEnableReversal" : true, // it will allow you to enable or disable the reverse button
      "isEditableReversalUI" : true, // [optional] true will enable the ui and false will disable
      "finishTimeout" : 2,//[optional] Add the number of seconds
};

nearpay.refund(reqData).then((response) => {
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

# 5. Reconcile 

```
Parameter Details 

1. Enable UI enable : boolean parameter
2. Timeout : timeout after


var reqData = {
      "isEnableUI" : true, //[optional] true will enable the ui and false will disable 
      "finishTimeout" : 2 // [optional] Add the number of seconds
};

nearpay.refund(reqData).then((response) => {
    let resultJSON = JSON.parse(response);
    if(resultJSON.status == 200){
        // Initialize Success with 200
    }else if(resultJSON.status == 204){
        // Initialize Failed with 204, Plugin iniyialize failed with null 
    }
});


```

# 6. Reverse 

```
Parameter Details

1. isUiEnabled : Boolean
3. Transaction UUID from response - uuid
3. Timeout : timeout after

var reqData = {
      "isEnableUI" : true, //[optional] true will enable the ui and false will disable 
      "transaction_uuid" :purchaseReceipt.uuid, //[Required] add Transaction Reference Retrieval Number we need to pass from purchase response list contains uuid dict key "udid",  pass that value here.
      "finishTimeout" : 2 // [optional] Add the number of seconds
};

nearpay.reverse(reqData).then((response) => {
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

# 7. Logout 

```
nearpay.logout();
```

### Response Status

```
General Response

200 :  Success
204 : Initiase Missing
400 : Invalid arguments
401 : Authentication
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
# nearpay-react-native-sdk
