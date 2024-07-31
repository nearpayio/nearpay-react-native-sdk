# Nearpay SDK React Native Plugin For Android

Nearpay SDK for Embedded and Remote connections

- Embedded Nearpay plugin for Android device payment using NFC. Plugin supported from
  Minimum SDK version 21. This plugin will work based on
  [Nearpay SDK](https://docs.nearpay.io/sdk/)

- Remote Nearpay for all types of devices (Android, iOS, Web), where the RemoteNearpay will
  connect to a proxy that will complete the payment

# Install plugin

```bash
npm install "https://github.com/nearpayio/nearpay-react-native-sdk.git#main" --save

Plugin will support minimum supported ANDROID SDK version 21 and above only.
```

to install google version use the following command:

```bash
npm install "https://github.com/nearpayio/nearpay-react-native-sdk.git#google" --save
```

# EmbededNearpay (Android Only)

```typescript
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
  Locale,
} from '@nearpaydev/react-native-nearpay-sdk';

const EmbededNearpay = new EmbededNearpay({
  authtype: AuthenticationType.email, // the Authentication type (Email, mobile, etc)
  authvalue: '<Enter Your Email Here>', // the Authentication value
  environment: Environments.sandbox, // Transaction environment
  locale: Locale.default, // [Optional] language options
});
```

`EmbededNearpay` object should be created once and served to the whole application

### Authentications Types

- Login ( support both Email or Mobile user will chose )
- Email
- Mobile
- JWT

### initialize (Optional)

optionally initialize the plugin, if not used the plugin will initialize him self automatically

you can use this method if you want to do any optional behavior on initialize success

```typescript
EmbededNearpay.initialize().then(() => {
  // do some thing
});
```

### Setup (Optional)

used to install payment plugin and verify the entered authentication

```typescript
EmbededNearpay
  .setup()
  .then((res) => {
    console.log('=-=-=-=-=-= setup success =-=-==-=-=-');
    console.log({ res });
  })
  .catch((e) => {
    console.log('=-=-=-=-=-= setup fail =-=-==-=-=-');
    console.log({ e });
  });
```

### Purchase

```typescript
EmbededNearpay
  .purchase({
    amount: 1000, // Required, means 10.00
    transactionId: uuidv4(), //[Optional] specify the transaction uuid for later retrieval
    customerReferenceNumber: '', // [Optional] reference number for customer use only
    enableReceiptUi: true, // [Optional] show the receipt in ui
    enableReversalUi: true, //[Optional] enable reversal of transaction from ui
    enableUiDismiss: true, //[Optional] the ui is dismissible
    finishTimeout: 60, //[Optional] finish timeout in seconds
  })
  .then((response) => {
    console.log(`=-=-=-= purchase success =-=-=-=`);
    console.log(`purchase response:`);
    console.log(JSON.stringify(response, null, 2));
    return response;
  })
  .catch((e) => {
    console.log(`=-=-=-= purchase failed =-=-=-=`);
    console.log(`error: ${e}`);
    throw e;
  });
```

### Refund

```typescript
EmbededNearpay
  .refund({
    amount: 1000, // [Required], means 10.00
    originalTransactionUUID: 'f5079b9d-b61c-4180-8a4d-9780f7a9cd8f', // [Required] the original transaction uuid that you want to refund
    transactionId: uuidv4(), //[Optional] specify the transaction uuid for later retrieval
    customerReferenceNumber: '', //[Optional]
    enableReceiptUi: true, // [Optional] show the receipt in ui
    enableReversalUi: true, //[Optional] enable reversal of transaction from ui
    editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
    enableUiDismiss: true, //[Optional] the ui is dismissible
    finishTimeout: 60, //[Optional] finish timeout in seconds
    adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
  })
  .then((response) => {
    console.log(`=-=-=-= refund success =-=-=-=`);
    console.log(`refund response: ${response}`);
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
EmbededNearpay
  .reverse({
    originalTransactionUUID: '2ddbbd15-a97e-4949-b5c2-fa073ab750eb', // [Required] the original transaction uuid that you want to reverse
    enableReceiptUi: true, // [Optional] show the receipt in ui
    enableUiDismiss: true, //[Optional] the ui is dismissible
    finishTimeout: 60, //[Optional] finish timeout in seconds
  })
  .then((response) => {
    console.log(`=-=-=-= reverse success =-=-=-=`);
    console.log(`reverse response: ${response}`);
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
EmbededNearpay
  .reconcile({
    enableReceiptUi: true, // [Optional] show the receipt in ui
    enableUiDismiss: true, //[Optional] the ui is dismissible
    finishTimeout: 60, //[Optional] finish timeout in seconds
    adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
  })
  .then((response) => {
    console.log(`=-=-=-= reconcile success =-=-=-=`);
    console.log(`reconcile response: ${response}`);
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
EmbededNearpay
  .session({
    sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
    enableReceiptUi: true, // [Optional] show the receipt in ui
    enableReversalUi: true, //[Optional] enable reversal of transaction from ui
    enableUiDismiss: true, //[Optional] the ui is dismissible
    finishTimeout: 60, //[Optional] finish timeout in seconds
  })
  .then((response) => {
    console.log(`=-=-=-= session success =-=-=-=`);
    console.log(`session response: ${response}`);
    return response;
  })
  .catch((e) => {
    console.log(`=-=-=-= session failed =-=-=-=`);
    console.log(`error: ${e}`);
    throw e;
  });
```

### Logout

```typescript
EmbededNearpay
  .logout()
  .then((response) => {
    console.log(`=-=-=-= logout success =-=-=-=`);
    console.log(`logout response: ${response}`);
    return response;
  })
  .catch((e) => {
    console.log(`=-=-=-= logout failed =-=-=-=`);
    console.log(`error: ${e}`);
    throw e;
  });
```

### getTransaction

get a transaction by uuid

```typescript
EmbededNearpay
  .getTransaction({
    transactionUUID: 'a2fd6519-2b37-4336-be6d-5520bb3b6427',
    adminPin: '0000',
  })
  .then((res) => {
    console.log(`=-=-=-= get transaction success =-=-=-=`);
    console.log(res);
  });
```

### getTransactions

get transactions

```typescript
EmbededNearpay
  .getTransactionsList({
    page: 1,
    limit: 20,
    adminPin: '0000',
  })
  .then((res) => {
    console.log(`=-=-=-= get transactions success =-=-=-=`);
    console.log(res);
  });
```

### getReconciliation

get a reconciliation by uuid

```typescript
EmbededNearpay
  .getReconciliation({
    reconciliationUUID: '6d4a48b8-d194-4aad-92c9-a77606758799',
    adminPin: '0000',
  })
  .then((res) => {
    console.log(`=-=-=-= get Reconciliation success =-=-=-=`);
    console.log(res);
  });
```

### getReconciliations

get reconciliations

```typescript
EmbededNearpay
  .getReconciliationsList({
    page: 1,
    limit: 20,
    adminPin: '0000',
  })
  .then((res) => {
    console.log(`=-=-=-= get Reconciliations success =-=-=-=`);
    console.log(res);
  });
```

### checkCompatibility

Check compatibility

```typescript
    let isCompatible = await EmbededNearpay.current?.checkCompatibility();
    if(isCompatible == true) {
     console.log('isDeviceCompatible');
    } else {
     console.log('isDeviceNotCompatible');
    }
```

### Nearpay plugin response will be be in below formats

[Model Response](https://docs.nearpay.io/sdk/sdk-models)

## RemoteNearpay

```typescript
import {
  NearpayProvider,
  RemoteNearPay,
} from '@nearpaydev/react-native-nearpay-sdk';

const remoteNearpay: RemoteNearPay = new RemoteNearPay(); // init the object
remoteNearpay.addAutoReconnect(); // [optional] add an auto reconnect to last connected device
remoteNearpay.connectToLastUser(); // [optional] try to connect to last connection on launch
```

`RemoteNearPay` object should be served to the whole application using `NearpayProvider`

```typescript
import { NearpayProvider } from '@nearpaydev/react-native-nearpay-sdk';

<NearpayProvider nearpay={remoteNearpay}>
  <MyApplication />
</NearpayProvider>;
```

you can access the value of `RemoteNearpay` object from the hook `useNearpay` anywhere in the application (under the `NearpayProvider`) and other values like `connectionState`

```typescript
import { useNearpay } from '@nearpaydev/react-native-nearpay-sdk';

function Comp() {
  const { nearpay, connectionState } = useNearpay();

  // ... the rest of the component
}
```

### Connection

you can connect to the proxy using the following method

```typescript
import { NEARPAY_CONNECTOR } from '@nearpaydev/react-native-nearpay-sdk';

remoteNearpay
  .connect({
    type: NEARPAY_CONNECTOR.WS,
    ip: '192.168.102.160',
    port: '8080',
  })
  .then(() => {
    console.log('connection success');
  })
  .catch((err) => {
    console.log('error:', err);
  });
```

Note: the RemoteSDK and the Proxy should be connected to the same network

you can disconnect using the method `remoteNearpay.disconnectDevice()`

### Terminal Operations

Terminal Object is responsible of doing operations like purchase, refund, reverse, etc.

you can access terminal operation using `remoteNearpay.getTerminal()`

you can see Terminal Operations and their results [here](https://docs.nearpay.io/sdk/remote-integration/web-sdk/web-sdk#purchase)

### Listeners

you can use listeners to get state update of the `RemoteNearpay` object

see the [listener section](https://docs.nearpay.io/sdk/remote-integration/web-sdk/listeners)

### States

`RemoteNearpay` has different states that describes the `RemoteNearpay` device or the POS device

you can see the states [here](https://docs.nearpay.io/sdk/remote-integration/web-sdk/sdk-states)
