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
# Get Started

```js
import nearpay from 'react-native-nearpay-plugin';
// init 
let local = nearpay.Locale.default; // english
let enviroment = nearpay.Environments.sandbox;
let authType = nearpay.AuthenticationType.login;
nearpay.initialise(local,enviroment,authType);

// first time open the app run setup once at least 
nearpay.setup(authType);

// perform purshase transaction
let amount = 100.20;
let customerRefrencNumber = '91f60ed7-1287-4f3f-bf0f-a00cda60bd0c'; // optional
let enableReceiptUi = true; // optional
let isEnableReverse = true; // optional
let timeout = 1000; // optional in milliseconds
let data = {
amount:100.20,
// customerRefrencNumber:'91f60ed7-1287-4f3f-bf0f-a00cda60bd0c',
// enableReceiptUi:false,
// isEnableReverse:false,
// timeout:10000
}
let purchase_transaction = await nearpay.purchase(data);

console.log({purchase_transaction})
```



# Usage

```js
import nearpay from 'react-native-nearpay-plugin';

```

# Authentications

Authentication Types

1. Login ( support both Email or Mobile user will chose ) (AuthenticationType.login.values)
2. LoginWithEmail
3. LoginWithMobile
4. JWT

```js
 nearpay.AuthenticationType.login
 nearpay.AuthenticationType.email
 nearpay.AuthenticationType.mobile
 nearpay.AuthenticationType.jwt
```

# 1. Initialize SDK

Parameter position

1. Locale deafult language : Locale.default
2. Environments availble are sandbox,testing,production :  Environments.sandbox
3. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
4. Authentication input value
```js
let local = nearpay.Locale.default; // english
let enviroment = nearpay.Environments.sandbox;
let authType = nearpay.AuthenticationType.login;
nearpay.initialise(local,enviroment,authType);

```

# 2. Setup

Parameter
authType, authValue
1. AuthenticationType available are userenter,email,mobile,jwt : AuthenticationType.email
2. Authentication input value
```js
let authType = nearpay.AuthenticationType.login;
nearpay.setup(authType);

```

# 3. Purchase

Parameter
1. Amount for purchase
2. Customer referening number unique string
3. Enable Reciept UI enable : boolean show reciept ui for user
4. Enable Reverse UI enable : boolean show reverse button for user to cancel transaction
5. Timeout : end transaction after timeout
```js
let amount = 100.20;
let customerRefrencNumber = '91f60ed7-1287-4f3f-bf0f-a00cda60bd0c'; // optional
let enableReceiptUi = true; // optional
let isEnableReverse = true; // optional
let timeout = 1000; // optional in milliseconds

let purchase_transaction = await nearpay.purchase(amount, customerRefrencNumber, enableReceiptUi, isEnableReverse, timeout);

```

# 4. Refund

Parameter
1. Amount for Refund
2. Transaction UUID from response - uuid ( original transaction uuid )
3. Customer referening number unique string
4. Enable UI enable : boolean show reciept ui for user
5. Enable Reverse UI enable : boolean show reverse button for user to cancel transaction
6. Is Editable refund UI enable : boolean 
7. Timeout : end transaction after timeout
```js
let amount = 100.20;
let customerRefrencNumber = '91f60ed7-1287-4f3f-bf0f-a00cda60bd0c'; // optional
let enableReceiptUi = true; // optional
let isEnableReverse = true; // optional
let isEditableReversalUI = true; // optional
let timeout = 1000; // optional in milliseconds
let original_transaction = purchase_transaction.uuid;

let refund_transactions = await nearpay.refund(amount, original_transaction, customerRefrencNumber, enableReceiptUi, isEnableReverse, isEditableReversalUI, timeout);
```

# 5. Reconcile 

Parameter
isUiEnabled,timeout,authType, authValue
1. enableReceiptUi : boolean parameter
```js
let reconiliation = await nearpay.reconcile();

```

# 6. Reverse


Parameter
transactionID, isUiEnabled, timeout,authType, authValue
1. Transaction UUID from response - uuid
2. isUiEnabled : Boolean
3. Timeout : timeout after
```js
let reversed_transaction = await nearpay.reverse(purchase_transaction.uuid);

```

# 7. Logout

```js
nearpay.logout();
```

### Response Status

```
General Response

200: Success
401: Authentication
402: General Failure
403: Failure Message
404: Invalid Status

Purchase Response
405: Purchase Declined
406: Purchase Rejected

Refund Response
407: Refund Declined
408: Refund Rejected

Logout Response
409: User Already logout

Setup Response
410: Already Installed
411: Not Installed

```

## Nearpay plugin response will be be in below formats

[Model Response](https://docs.nearpay.io/sdk/sdk-models)
# nearpay-react-native-sdk
