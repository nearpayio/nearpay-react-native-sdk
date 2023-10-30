import { NativeModules, Platform } from 'react-native';
import type {
  EmbededSessionOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededRefundOptions,
  EmbededPurchaseOptions,
  InitializeOptions,
  EmbededUpdateAuthenticationOptions,
  EmbededGetTransactionsListOptions,
  EmbededGetReconciliationsListOptions,
  EmbededGetTransactionOptions,
  EmbededGetReconciliationOptions,
  EmbededReceiptToImageOptions,
  SessionResponse,
} from '../../types';
import {
  ReconciliationBannerList,
  ReconciliationReceipt,
  TransactionData,
} from '@nearpaydev/nearpay-ts-sdk';
import { SessionData } from '@nearpaydev/nearpay-ts-sdk';
import { TransactionBannerList } from '@nearpaydev/nearpay-ts-sdk';

const LINKING_ERROR =
  `The package '@nearpaydev/react-native-nearpay-sdk' doesn't seem to be linked. Make sure: \n\n` +
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
  }: EmbededPurchaseOptions): Promise<TransactionData> {
    const data = {
      amount,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      job_id: transactionId,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.purchase(data)
    );

    const transactionData = response['result'];

    return transactionData;
  }

  public async refund({
    amount,
    originalTransactionUUID,
    transactionId,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
    editableRefundAmountUI = true,
    adminPin,
  }: EmbededRefundOptions): Promise<TransactionData> {
    const data = {
      amount,
      original_transaction_uuid: originalTransactionUUID,
      job_id: transactionId,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      enableEditableRefundAmountUi: editableRefundAmountUI,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.refund(data)
    );

    const transactionData = response['result'];

    return transactionData;
  }

  public async reconcile({
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
    adminPin,
  }: EmbededReconcileOptions): Promise<ReconciliationReceipt> {
    const data = {
      finishTimeout,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.reconcile(data)
    );

    const reconciliationReceipt = response['result'];

    return reconciliationReceipt;
  }

  public async reverse({
    originalTransactionUUID,
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
  }: EmbededReverseOptions): Promise<TransactionData> {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReceiptUi: enableReceiptUi,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.reverse(data)
    );

    const transactionData = response['result'];

    return transactionData;
  }

  public async logout() {
    return await this._callPluginMethod(async () =>
      NearpayPlugin.logout({ __dummy__: 1 })
    );
  }

  public async setup() {
    return await this._callPluginMethod(async () =>
      NearpayPlugin.setup({ __dummy__: 1 })
    );
  }

  public async session({
    sessionID,
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
  }: EmbededSessionOptions): Promise<SessionResponse> {
    const data = {
      sessionID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.session(data)
    );
    const transactionData = response['result'];

    return transactionData;
  }

  public async updateAuthentication({
    authtype,
    authvalue,
  }: EmbededUpdateAuthenticationOptions) {
    const data = {
      authtype,
      authvalue,
    };

    return await this._callPluginMethod(async () =>
      NearpayPlugin.updateAuthentication(data)
    );
  }

  // =-=-=- Queries -=-=-=
  public async getTransactionsList({
    page,
    limit,
    startDate,
    endDate,
  }: EmbededGetTransactionsListOptions): Promise<TransactionBannerList> {
    const data = {
      page,
      limit,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.getTransactionsList(data)
    );
    const transactionBannerList = response['result'];

    return transactionBannerList;
  }

  public async getTransaction({
    transactionUUID,
  }: EmbededGetTransactionOptions): Promise<TransactionData> {
    const data = {
      transaction_uuid: transactionUUID,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.getTransaction(data)
    );

    const transactionData = response['result'];

    return transactionData;
  }

  public async getReconciliation({
    reconciliationUUID,
  }: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt> {
    const data = {
      reconciliation_uuid: reconciliationUUID,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.getReconciliation(data)
    );
    const reconciliationReceipt = response['result'];

    return reconciliationReceipt;
  }

  public async getReconciliationsList({
    page,
    limit,
    endDate,
    startDate,
  }: EmbededGetReconciliationsListOptions): Promise<ReconciliationBannerList> {
    const data = {
      page,
      limit,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.getReconciliationsList(data)
    );
    const ReconciliationBannerList = response['result'];

    return ReconciliationBannerList;
  }

  public async receiptToImage({
    receipt,
    receiptFontSize = 1,
    receiptWidth = 850,
  }: EmbededReceiptToImageOptions): Promise<Uint8Array> {
    const data = {
      receipt: JSON.stringify(receipt),
      receipt_width: receiptWidth,
      receipt_font_size: receiptFontSize,
    };

    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.receiptToImage(data)
    );

    const bytes = Uint8Array.from(response['result']);

    return bytes;
  }

  // TODO: revise return types
  private async _callPluginMethod(
    methodFunc: () => Promise<any>
  ): Promise<any> {
    const res = JSON.parse(await methodFunc());

    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      throw res;
    }
  }
}
