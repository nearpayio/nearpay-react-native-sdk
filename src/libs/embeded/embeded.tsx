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
  constructor(intOptions: InitializeOptions) {
    const isAndroid = Platform.select({ android: true });

    if (!isAndroid) {
      throw `Nearpay: the Embeded SDK is avalible only in Android`;
    }

    this.initialize(intOptions);
  }

  public async initialize({
    authtype,
    authvalue,
    environment,
    locale,
    networkConfig,
    uiPosition,
    loadingUi,
    arabicPaymentText,
    englishPaymentText,
  }: InitializeOptions) {
    const data = {
      authtype,
      authvalue,
      environment,
      locale,
      network_configuration: networkConfig,
      ui_position: uiPosition,
      loading_ui: loadingUi,
      arabic_payment_text: arabicPaymentText,
      english_payment_text: englishPaymentText,
    };
    return this._callPluginMethod(() => NearpayPlugin.initialize(data));
  }

  public async purchase({
    amount,
    transactionId,
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
      job_id: transactionId,
    };

    return this._callPluginMethod(async () => NearpayPlugin.purchase(data));
  }

  public refund({
    amount,
    originalTransactionUUID,
    transactionId,
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
      job_id: transactionId,
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
  // TODO: add dates
  public getTransactionsList({
    page,

    limit,
  }: EmbededGetTransactionsOptions) {
    const data = {
      page,
      limit,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getTransactionsList(data)
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

  // TODO: add dates
  public getReconciliationsList({
    page,
    limit,
  }: EmbededGetReconciliationsOptions) {
    const data = {
      page,
      limit,
    };

    return this._callPluginMethod(async () =>
      NearpayPlugin.getReconciliationsList(data)
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

  // TODO: revise return types
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
