# Nearpay SDK React Native Plugin For Android

Nearpay SDK for Embeded and Remote connections

- Embeded Nearpay plugin for Android device payment using NFC. Plugin supported from
Minimum SDK version 21. This plugin will work based on
[Nearpay SDK](https://docs.nearpay.io/sdk/)

- Remote Nearpay for all types of devices (Android, iOS, Web), where the RemoteNearpay will
connect to a proxy that will complete the payment

# Install plugin

``` javascript

npm install "https://github.com/nearpayio/nearpay-react-native-sdk.git#main" --save

Plugin will support minimum supported ANDROID SDK version 21 and above only.

```

# EmbededNearpay (Android Only)

```typescript
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
  Locale,
} from 'react-native-nearpay-sdk';

const embededNearpay = new EmbededNearpay({
  authtype: AuthenticationType.email, // the Authentication type (Email, mobile, etc)
  authvalue: '<Enter Your Email Here>', // the Authentication value
  environment: Environments.sandbox, // Transation enviroment
  locale: Locale.default, // [Optional] language options
});
```
`EmbededNearpay` obeject should be created once and served to the wholl application


### Authentications Types

- Login ( support both Email or Mobile user will chose )
- Email
- Mobile
- JWT



### Setup (Optional)

```typescript
embededNearpay.setup() // will start a setup 
```

### Purchase 

```typescript
embededNearpay.purchase({
        amount: 1000, // Required, maens 10.00
        transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
        customerReferenceNumber: '', // [Optional] referance number for customer use only
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: 60, //[Optional] finish timeout in seconds
      })
      .then((response) => {
        console.log(`=-=-=-= purchse success =-=-=-=`);
        console.log(`purchse respone:`);
        console.log(JSON.stringify(response, null, 2));
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= purchse failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });

```

### Refund 

```typescript 
embededNearpay.refund({
        amount: 1000, // [Required], means 10.00
        originalTransactionUUID: "f5079b9d-b61c-4180-8a4d-9780f7a9cd8f", // [Required] the orginal trnasaction uuid that you want to refund
        transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
        customerReferenceNumber: '', //[Optional]
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: 60, //[Optional] finish timeout in seconds
        adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        console.log(`=-=-=-= refund success =-=-=-=`);
        console.log(`refund respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= refund failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
```

### Reverse 

```typescript
embededNearpay.reverse({
        originalTransactionUUID: "2ddbbd15-a97e-4949-b5c2-fa073ab750eb", // [Required] the orginal trnasaction uuid that you want to reverse
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: 60, //[Optional] finish timeout in seconds
      })
      .then((response) => {
        console.log(`=-=-=-= reverse success =-=-=-=`);
        console.log(`reverse respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= reverse failed =-=-=-=`);
        console.log(`error:`);
        console.log(JSON.stringify(e, null, 2));
        throw e;
      });



```


### Reconcile 

```typescript
embededNearpay.reconcile({
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: 60, //[Optional] finish timeout in seconds
        adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        console.log(`=-=-=-= reconcile success =-=-=-=`);
        console.log(`reconcile respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= reconcile failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
```


### Session

```typescript
embededNearpay.session({
        sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: 60, //[Optional] finish timeout in seconds
      })
      .then((response) => {
        console.log(`=-=-=-= session success =-=-=-=`);
        console.log(`session respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= session failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
```


### Logout 

``` typescript
embededNearpay.logout()
      .then((response) => {
        console.log(`=-=-=-= logout success =-=-=-=`);
        console.log(`logout respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= logout failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });

```

### Nearpay plugin response will be be in below formats

[Model Response](https://docs.nearpay.io/sdk/sdk-models)


