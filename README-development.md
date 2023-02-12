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
Plugin will support minimum supported ANDROID SDK version 26 and above only.
```

# Usage

```react-native
import { initialize,purchase, refund, reconcile, reverse, logout, setup,Environments, AuthenticationType,Locale  } from 'react-native-nearpay-plugin';


```

# Authentications

Authentication Types

1. Login ( support both Email or Mobile user will chose ) (AuthenticationType.login.values)
2. LoginWithEmail
3. LoginWithMobile
4. JWT

```
 AuthenticationType.login
 AuthenticationType.email
 AuthenticationType.mobile
 AuthenticationType.jwt

```

# 1. Initialize SDK

```
Parameter position

1. Locale deafult language : Locale.default
2. Environments availble are sandbox,testing,production :  Environments.sandbox
3. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
4. Authentication input value

initialise(Locale.default,Environments.sandbox,authType, authValue);

```

# 2. Setup function

```
Parameter
authType, authValue

1. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
2. Authentication input value

setup(authType, authValue);

```

# 3. Purchase function

```
Parameter
String amountStr, String customerReferenceNumber,Boolean enableReceiptUi,Boolean isEnableReverse,String timeout,String authType, String authValue
1. Amount for purchase
2. Customer referening number unique string
3. Enable Reciept UI enable : boolean parameter
4. Enable Reverse UI enable : boolean parameter
5. Timeout : timeout after
6. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
7. Authentication input value

purchase(String amountStr, String customerReferenceNumber,Boolean enableReceiptUi,Boolean isEnableReverse,String timeout,String authType, String authValue);

Example

"0001","test123456",true,true,timeout,authType, authValue

```

# 4. Refund function

```
Parameter
amount,transactionUuid,customerRefNo,isUiEnabled,isEnableReverse,isEditableReversalUI,timeout,authType, authValue
1. Amount for purchase
2. Transaction UUID from response - uuid
3. Customer referening number unique string
4. Enable UI enable : boolean parameter
5. Enable Reverse UI enable : boolean parameter
6. Is Editable refund UI enable : boolean parameter
7. Timeout : timeout after
8. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
9. Authentication input value

refund(String amountStr, String customerReferenceNumber,Boolean enableReceiptUi,Boolean isEnableReverse,Boolean isEditableReversalUI,String timeout,String authType, String authValue);

```

# 5. Reconcile function

```
Parameter
isUiEnabled,timeout,authType, authValue
1. Enable UI enable : boolean parameter
2. Timeout : timeout after
3. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
4. Authentication input value

reconcile(isUiEnabled,timeout,authType, authValue);

```

# 6. Reverse function

```
Parameter
transactionID, isUiEnabled, timeout,authType, authValue
1. Transaction UUID from response - uuid
2. isUiEnabled : Boolean
3. Timeout : timeout after
4. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
5. Authentication input value

reverse(transactionID, isUiEnabled, timeout,authType, authValue);

```

# 7. Logout function

```
logout();
```

### Response Status

```
General Response

200 :  Success
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

# nearpay-react-native-sdk

## Usage Example Project

navigate to example folder

cd example

# App project run

# Navigate to example project

npx react-native run-android