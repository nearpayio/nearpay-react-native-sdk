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
    transactionUUID,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
  }: EmbededPurchaseOptions) {
    const data = {
      amount,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      transaction_uuid: transactionUUID,
    };

    return this._callPluginMethod(async () => NearpayPlugin.purchase(data));
  }

  public refund({
    amount,
    originalTransactionUUID,
    transactionUUID,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
    editableReversalAmountUI = true,
    adminPin,
  }: EmbededRefundOptions): Promise<string> {
    const data = {
      amount,
      original_transaction_uuid: originalTransactionUUID,
      transaction_uuid: transactionUUID,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      enableEditableRefundAmountUi: editableReversalAmountUI,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    return this._callPluginMethod(async () => NearpayPlugin.refund(data));
  }

  public reconcile({
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
    adminPin,
  }: EmbededReconcileOptions): Promise<string> {
    const data = {
      finishTimeout,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    return this._callPluginMethod(async () => NearpayPlugin.reconcile(data));
  }

  public reverse({
    originalTransactionUUID,
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
  }: ReverseOptions): Promise<string> {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReceiptUi: enableReceiptUi,
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
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
  }: SessionOptions): Promise<string> {
    const data = {
      sessionID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.session(data));
  }

  public receiptToImage(inputParams: any): Promise<string> {
    return this._callPluginMethod(async () =>
      NearpayPlugin.recieptToImage(inputParams)
    );
  }
}
