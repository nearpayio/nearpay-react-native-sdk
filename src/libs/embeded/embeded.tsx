import { NativeModules, Platform } from 'react-native';
import type {
  SessionOptions,
  ReverseOptions,
  EmbededReconcileOptions,
  EmbededRefundOptions,
  EmbededPurchaseOptions,
  InitializeOptions,
} from '../../types';

const LINKING_ERROR =
  `The package 'react-native-nearpay-plugin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NearpayPlugin = NativeModules.NearpaySdk
  ? NativeModules.NearpaySdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class EmbededNearpay {
  constructor({ authtype, authvalue, environment, locale }: InitializeOptions) {
    const isAndroid = Platform.select({ android: true });

    if (!isAndroid) {
      throw `Nearpay: the Embeded SDK is avalible only in Android`;
    }

    const data = {
      authtype,
      authvalue,
      environment,
      locale,
    };

    NearpayPlugin.initialize(data);
  }

  private async _callPluginMethod(
    methodFunc: () => Promise<any>
  ): Promise<any> {
    const res = JSON.parse(await methodFunc());

    if (res.status === 200) {
      return res;
    } else {
      throw res;
    }
  }

  public async purchase({
    amount,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversal = true,
    enableReceiptUi = true,
  }: EmbededPurchaseOptions) {
    const data = {
      amount,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      isEnableReversal: enableReversal,
      isEnableUI: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.purchase(data));
  }

  public refund({
    amount,
    transactionUUID,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversal = true,
    enableReceiptUi = true,
    editableReversalUI = true,
    adminPin,
  }: EmbededRefundOptions): Promise<string> {
    const data = {
      amount,
      transaction_uuid: transactionUUID,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      isEnableReversal: enableReversal,
      isEnableUI: enableReceiptUi,
      isEditableReversalUI: editableReversalUI,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    return this._callPluginMethod(async () => NearpayPlugin.refund(data));
  }

  public reconcile({
    finishTimeout = 60,
    enableReceiptUi = true,
    adminPin,
  }: EmbededReconcileOptions): Promise<string> {
    const data = {
      finishTimeout,
      isEnableUI: enableReceiptUi,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    return this._callPluginMethod(async () => NearpayPlugin.reconcile(data));
  }

  public reverse({
    transactionUUID,
    finishTimeout = 60,
    enableReceiptUi = true,
  }: ReverseOptions): Promise<string> {
    const data = {
      transaction_uuid: transactionUUID,
      finishTimeout,
      isEnableUI: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.reverse(data));
  }

  public logout(): Promise<string> {
    return this._callPluginMethod(async () =>
      NearpayPlugin.logout({ __dummy__: 1 })
    );
  }

  public setup(): Promise<string> {
    return this._callPluginMethod(async () =>
      NearpayPlugin.setup({ __dummy__: 1 })
    );
  }

  public session({
    sessionID,
    finishTimeout = 60,
    enableReversal = true,
    enableReceiptUi = true,
  }: SessionOptions): Promise<string> {
    const data = {
      sessionID,
      finishTimeout,
      isEnableReversal: enableReversal,
      isEnableUI: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.session(data));
  }

  public receiptToImage(inputParams: any): Promise<string> {
    return this._callPluginMethod(async () =>
      NearpayPlugin.recieptToImage(inputParams)
    );
  }
}

// function initialize({
//   authtype,
//   authvalue,
//   environment,
//   locale = Locale.default,
// }: InitializeOptions): Promise<string> {
//   const data = {
//     authtype,
//     authvalue,
//     environment,
//     locale,
//   };

//   return NearpayPlugin.initialize(data);
// }

// function purchase({
//   amount,
//   customerReferenceNumber = '',
//   finishTimeout = 60,
//   enableReversal = true,
//   enableReceiptUi = true,
// }: PurchaseOptions): Promise<string> {
//   const data = {
//     amount,
//     customer_reference_number: customerReferenceNumber,
//     finishTimeout,
//     isEnableReversal: enableReversal,
//     isEnableUI: enableReceiptUi,
//   };

//   return NearpayPlugin.purchase(data);
// }

// function refund({
//   amount,
//   transactionUUID,
//   customerReferenceNumber = '',
//   finishTimeout = 60,
//   enableReversal = true,
//   enableReceiptUi = true,
//   editableReversalUI = true,
//   adminPin,
// }: RefundOptions): Promise<string> {
//   const data = {
//     amount,
//     transaction_uuid: transactionUUID,
//     customer_reference_number: customerReferenceNumber,
//     finishTimeout,
//     isEnableReversal: enableReversal,
//     isEnableUI: enableReceiptUi,
//     isEditableReversalUI: editableReversalUI,
//     ...(adminPin !== undefined ? { adminPin } : null),
//   };

//   return NearpayPlugin.refund(data);
// }

// function reconcile({
//   finishTimeout = 60,
//   enableReceiptUi = true,
//   adminPin,
// }: ReconcileOptions): Promise<string> {
//   const data = {
//     finishTimeout,
//     isEnableUI: enableReceiptUi,
//     ...(adminPin !== undefined ? { adminPin } : null),
//   };

//   return NearpayPlugin.reconcile(data);
// }

// function reverse({
//   transactionUUID,
//   finishTimeout = 60,
//   enableReceiptUi = true,
// }: ReverseOptions): Promise<string> {
//   const data = {
//     transaction_uuid: transactionUUID,
//     finishTimeout,
//     isEnableUI: enableReceiptUi,
//   };

//   return NearpayPlugin.reverse(data);
// }

// function logout(): Promise<string> {
//   return NearpayPlugin.logout();
// }

// function setup(): Promise<string> {
//   return NearpayPlugin.setup();
// }

// function session({
//   sessionID,
//   finishTimeout = 60,
//   enableReversal = true,
//   enableReceiptUi = true,
// }: SessionOptions): Promise<string> {
//   const data = {
//     sessionID,
//     finishTimeout,
//     isEnableReversal: enableReversal,
//     isEnableUI: enableReceiptUi,
//   };

//   return NearpayPlugin.session(data);
// }

// function receiptToImage(inputParams: any): Promise<string> {
//   return NearpayPlugin.recieptToImage(inputParams);
// }
