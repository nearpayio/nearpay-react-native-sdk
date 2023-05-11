import { NativeModules, Platform } from 'react-native';
import type {
  SessionOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededRefundOptions,
  EmbededPurchaseOptions,
  InitializeOptions,
} from '../../types';
import { DeviceEventEmitter } from 'react-native';
import { v4 } from 'uuid';
import {
  PurchaseErrorMap,
  ReconcileErrorMap,
  RefundErrorMap,
  ReverseErrorMap,
  SessionErrorMap,
} from '../../models/error_status_map';
import { ApiResponse } from '../../models/ApiResponse';
import {
  ReconciliationRecipt,
  TransactionRecipt,
} from '@nearpaydev/nearpay-ts-sdk';
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

    this._callPluginMethod(NearpayPlugin.initialize, data, () => {});
  }

  private async _callPluginMethod(
    methodFunc: (data: any) => Promise<any>,
    data: any,
    callback: (response: ApiResponse) => void
  ): Promise<any> {
    const channel_name = v4();
    data['channel_name'] = channel_name;

    const xxxxxx = await methodFunc(data);
    DeviceEventEmitter.addListener(channel_name, (response) => {
      const JsonResponse: ApiResponse = JSON.parse(response);
      callback(JsonResponse);
    });

    // if (res.status === 200) {
    //   return res;
    // } else {
    //   throw res;
    // }
  }

  public async purchase({
    amount,
    transactionUUID,
    customerReferenceNumber = '',
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
    onPurchaseSuccess,
    onPurchaseFailed,
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

    return this._callPluginMethod(NearpayPlugin.purchase, data, (response) => {
      if (response.status === 200) {
        onPurchaseSuccess !== undefined &&
          onPurchaseSuccess(response.receipts as TransactionRecipt[]);
      } else {
        const err = PurchaseErrorMap(response);
        onPurchaseFailed !== undefined && onPurchaseFailed(err);
      }
    });
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
    onRefundSuccess,
    onRefundFailed,
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

    return this._callPluginMethod(NearpayPlugin.refund, data, (response) => {
      if (response.status === 200) {
        onRefundSuccess !== undefined &&
          onRefundSuccess(response.receipts as TransactionRecipt[]);
      } else {
        const err = RefundErrorMap(response);
        onRefundFailed !== undefined && onRefundFailed(err);
      }
    });
  }

  public reconcile({
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
    adminPin,
    onReconcileFailed,
    onReconcileSuccess,
  }: EmbededReconcileOptions): Promise<string> {
    const data = {
      finishTimeout,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    return this._callPluginMethod(NearpayPlugin.reconcile, data, (response) => {
      if (response.status === 200) {
        onReconcileSuccess !== undefined &&
          onReconcileSuccess(response.receipts as ReconciliationRecipt[]);
      } else {
        const err = ReconcileErrorMap(response);
        onReconcileFailed !== undefined && onReconcileFailed(err);
      }
    });
  }

  public reverse({
    originalTransactionUUID,
    finishTimeout = 60,
    enableReceiptUi = true,
    enableUiDismiss = true,
    onReverseFailed,
    onReverseSuccess,
  }: EmbededReverseOptions): Promise<string> {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReceiptUi: enableReceiptUi,
    };

    return this._callPluginMethod(NearpayPlugin.reverse, data, (response) => {
      if (response.status === 200) {
        onReverseSuccess !== undefined &&
          onReverseSuccess(response.receipts as TransactionRecipt[]);
      } else {
        const err = ReverseErrorMap(response);
        onReverseFailed !== undefined && onReverseFailed(err);
      }
    });
  }

  public logout(): Promise<string> {
    return this._callPluginMethod(
      NearpayPlugin.logout,
      { __dummy__: 1 },
      (response) => {}
    );
  }

  public setup(): Promise<string> {
    return this._callPluginMethod(
      NearpayPlugin.setup,
      { __dummy__: 1 },
      (response) => {}
    );
  }

  public session({
    sessionID,
    finishTimeout = 60,
    enableReversalUi = true,
    enableReceiptUi = true,
    enableUiDismiss = true,
    onSessionClose,
    onSessionFailed,
    onSessionOpen,
  }: SessionOptions): Promise<string> {
    const data = {
      sessionID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
    };

    return this._callPluginMethod(NearpayPlugin.session, data, (response) => {
      if (response.status === 200) {
        onSessionOpen !== undefined &&
          onSessionOpen(response.receipts as TransactionRecipt[]);
      } else if (response.status === 500) {
        onSessionClose !== undefined && onSessionClose(response.session!);
      } else {
        const err = SessionErrorMap(response);
        onSessionFailed !== undefined && onSessionFailed(err);
      }
    });
  }

  public receiptToImage(inputParams: any): Promise<string> {
    return this._callPluginMethod(
      NearpayPlugin.recieptToImage,
      inputParams,
      (response) => {}
    );
  }
}
