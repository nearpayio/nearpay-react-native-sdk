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
  GetUserSessionOptions,
} from '../../types';
import {
  ReconciliationBannerList,
  ReconciliationReceipt,
  TransactionData,
} from '@nearpaydev/nearpay-ts-sdk';
import { TransactionBannerList } from '@nearpaydev/nearpay-ts-sdk';
import { getPurchaseError } from '../errors/purchase_error/purchase_error_switch';
import {
  PurchaseDeclined,
  PurchaseError,
  PurchaseGeneralFailure,
  PurchaseInvalidStatus,
  PurchaseRejected,
} from '../errors/purchase_error/purchase_error';
import { getRefundError } from '../errors/refund_error/refund_error_switch';
import { getReconcileError } from '../errors/reconcile_error/reconcile_error_switch';
import { getReversalError } from '../errors/reversal_error/reversal_error_switch';
import { getQueryError } from '../errors/query_error/query_error_switch';
import { QueryError } from '../errors/query_error/query_error';
import { ReconcileError } from '../errors/reconcile_error/reconcile_error';
import { RefundError } from '../errors/refund_error/refund_error';
import { ReversalError } from '../errors/reversal_error/reversal_error';

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

    try {
      const response = await NearpayPlugin.purchase(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getPurchaseError(result);
      } else {
        const transactionData = result.result;
        return transactionData;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof PurchaseError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('Purchase failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the purchase. Please try again later.'
        );
      }
    }
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

    try {
      const response = await NearpayPlugin.refund(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getRefundError(result);
      } else {
        const transactionData = result.result;
        return transactionData;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof RefundError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('Refund failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the refund. Please try again later.'
        );
      }
    }
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
    try {
      const response = await NearpayPlugin.reconcile(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getReconcileError(result);
      } else {
        const reconciliationReceipt = result.result;
        return reconciliationReceipt;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof ReconcileError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('Reconcile failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the reconcile. Please try again later.'
        );
      }
    }
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

    try {
      const response = await NearpayPlugin.reverse(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getReversalError(result);
      } else {
        const transactionData = result.result;
        return transactionData;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof ReversalError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('Reverse failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the reverse. Please try again later.'
        );
      }
    }
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

  public async close() {
    return await this._callPluginMethod(async () =>
      NearpayPlugin.close({ __dummy__: 1 })
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
    customerReferenceNumber,
  }: EmbededGetTransactionsListOptions): Promise<TransactionBannerList> {
    const data = {
      page,
      limit,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      customer_reference_number: customerReferenceNumber,
    };

    try {
      const response = await NearpayPlugin.getTransactionsList(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getQueryError(result);
      } else {
        const transactionBannerList = result.result;
        return transactionBannerList;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof QueryError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('TransactionListQuery failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the query transaction list. Please try again later.'
        );
      }
    }
  }

  public async getTransaction({
    transactionUUID,
    enableReceiptUi,
    finishTimeOut,
  }: EmbededGetTransactionOptions): Promise<TransactionData> {
    const data = {
      transaction_uuid: transactionUUID,
      enableReceiptUi: enableReceiptUi,
      finishTimeOut: finishTimeOut,
    };

    try {
      const response = await NearpayPlugin.getTransaction(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getQueryError(result);
      } else {
        const transactionData = result.result;
        return transactionData;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof QueryError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('TransactionQuery failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the query transaction . Please try again later.'
        );
      }
    }
  }

  public async getReconciliation({
    reconciliationUUID,
    enableReceiptUi,
    finishTimeOut,
  }: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt> {
    const data = {
      reconciliation_uuid: reconciliationUUID,
      enableReceiptUi: enableReceiptUi,
      finishTimeOut: finishTimeOut,
    };

    try {
      const response = await NearpayPlugin.getReconciliation(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getQueryError(result);
      } else {
        const reconciliationReceipt = result.result;
        return reconciliationReceipt;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof QueryError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('ReconciliationQuery failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the query reconciliation. Please try again later.'
        );
      }
    }
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

    try {
      const response = await NearpayPlugin.getReconciliationsList(data);
      const result = JSON.parse(response);

      if (result.status != 200) {
        throw getQueryError(result);
      } else {
        const ReconciliationBannerList = result.result;
        return ReconciliationBannerList;
      }
    } catch (error) {
      // Handle specific error cases or rethrow custom error for further processing
      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        console.error('Failed to parse response:', error);
        throw new Error('Unexpected response format. Please try again.');
      } else if (error instanceof QueryError) {
        // Handle custom errors like NearpayPlugin failures
        console.error('ReconciliationListQuery failed:', error);
        throw error; // Re-throw the custom error for handling elsewhere
      } else {
        // Handle general or unexpected errors
        console.error('An unexpected error occurred:', error);
        throw new Error(
          'Something went wrong during the query reconciliation list. Please try again later.'
        );
      }
    }
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

  public async getUserSession({
    onSessionBusy,
    onSessionFailed,
    onSessionFree,
    onSessionInfo,
  }: GetUserSessionOptions) {
    const response = await this._callPluginMethod(async () =>
      NearpayPlugin.getUserSession({})
    );
    const status = response['status'];
    const data = response['result'];
    const message = response['message'];

    if (status === 200) {
      onSessionInfo(data);
    } else if (status === 201) {
      onSessionFree();
    } else if (status === 202) {
      onSessionBusy(message);
    } else {
      onSessionFailed(response);
    }
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
