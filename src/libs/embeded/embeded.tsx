import { NativeModules, Platform } from 'react-native';
import type {
  EmbededSessionOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededRefundOptions,
  EmbededPurchaseOptions,
  InitializeOptions,
  EmbededUpdateAuthenticationOptions,
  EmbededGetTransactionsOptions,
  EmbededGetReconciliationsOptions,
  EmbededGetTransactionOptions,
  EmbededGetReconciliationOptions,
  EmbededReceiptToImageOptions,
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

    this.initialize({ authtype, authvalue, environment, locale });
  }

  public async initialize({
    authtype,
    authvalue,
    environment,
    locale,
  }: InitializeOptions) {
    const data = {
      authtype,
      authvalue,
      environment,
      locale,
    };
    return this._callPluginMethod(() => NearpayPlugin.initialize(data));
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
  }: EmbededRefundOptions) {
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
  }: EmbededReconcileOptions) {
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
  }: EmbededReverseOptions) {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReceiptUi: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.reverse(data));
  }

  public logout() {
    return this._callPluginMethod(async () =>
      NearpayPlugin.logout({ __dummy__: 1 })
    );
  }

  public setup() {
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
  }: EmbededSessionOptions) {
    const data = {
      sessionID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
    };

    return this._callPluginMethod(async () => NearpayPlugin.session(data));
  }

  public updateAuthentication({
    authtype,
    authvalue,
  }: EmbededUpdateAuthenticationOptions) {
    const data = {
      authtype,
      authvalue,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.updateAuthentication(data)
    );
  }

  // =-=-=- Queries -=-=-=

  public getTransactionsList({
    page,

    limit,
  }: EmbededGetTransactionsOptions) {
    const data = {
      page,
      limit,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getTransactions(data)
    );
  }

  public getTransaction({ transactionUUID }: EmbededGetTransactionOptions) {
    const data = {
      transaction_uuid: transactionUUID,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getTransaction(data)
    );
  }

  public getReconciliation({
    reconciliationUUID,
  }: EmbededGetReconciliationOptions) {
    const data = {
      reconciliation_uuid: reconciliationUUID,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getReconciliation(data)
    );
  }

  public getReconciliationsList({
    page,

    limit,
  }: EmbededGetReconciliationsOptions) {
    const data = {
      page,
      limit,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getReconciliations(data)
    );
  }

  public receiptToImage({ receipt }: EmbededReceiptToImageOptions) {
    const data = {
      receipt: JSON.stringify(receipt),
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.receiptToImage(data)
    );
  }

  private async _callPluginMethod(
    methodFunc: () => Promise<any>
  ): Promise<any> {
    const res = JSON.parse(await methodFunc());

    console.log({ res: JSON.stringify(res) });

    if (res.status === 200) {
      return res;
    } else {
      throw res;
    }
  }
}
