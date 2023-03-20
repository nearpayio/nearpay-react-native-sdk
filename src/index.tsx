import { NativeModules, Platform } from 'react-native';
import {
  Locale,
  SessionOptions,
  ReverseOptions,
  ReconcileOptions,
  RefundOptions,
  PurchaseOptions,
  InitializeOptions,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-nearpay-plugin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NearpayPlugin = NativeModules.NearpayPlugin
  ? NativeModules.NearpayPlugin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

function initialize({
  authtype,
  authvalue,
  environment,
  locale = Locale.default,
}: InitializeOptions): Promise<string> {
  const data = {
    authtype,
    authvalue,
    environment,
    locale,
  };
  return NearpayPlugin.initialize(data);
}

function purchase({
  amount,
  customerReferenceNumber = '',
  finishTimeout = '60',
  enableReversal = true,
  enableReceiptUi = true,
}: PurchaseOptions): Promise<string> {
  const data = {
    amount,
    customer_reference_number: customerReferenceNumber,
    finishTimeout,
    isEnableReversal: enableReversal,
    isEnableUI: enableReceiptUi,
  };
  return NearpayPlugin.purchase(data);
}

function refund({
  amount,
  transactionUUID,
  customerReferenceNumber = '',
  finishTimeout = '60',
  enableReversal = true,
  enableReceiptUi = true,
  editableReversalUI = true,
  adminPin,
}: RefundOptions): Promise<string> {
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
  return NearpayPlugin.refund(data);
}

function reconcile({
  finishTimeout = '60',
  enableReceiptUi = true,
  adminPin,
}: ReconcileOptions): Promise<string> {
  const data = {
    finishTimeout,
    isEnableUI: enableReceiptUi,
    ...(adminPin !== undefined ? { adminPin } : null),
  };
  return NearpayPlugin.reconcile(data);
}

function reverse({
  transactionUUID,
  finishTimeout = '60',
  enableReceiptUi = true,
}: ReverseOptions): Promise<string> {
  const data = {
    transaction_uuid: transactionUUID,
    finishTimeout,
    isEnableUI: enableReceiptUi,
  };
  return NearpayPlugin.reverse(data);
}

function logout(): Promise<string> {
  return NearpayPlugin.logout();
}

function setup(): Promise<string> {
  return NearpayPlugin.setup();
}

function session({
  sessionID,
  finishTimeout = '60',
  enableReversal = true,
  enableReceiptUi = true,
}: SessionOptions): Promise<string> {
  const data = {
    sessionID,
    finishTimeout,
    isEnableReversal: enableReversal,
    isEnableUI: enableReceiptUi,
  };
  return NearpayPlugin.session(data);
}

function receiptToImage(inputParams: any): Promise<string> {
  return NearpayPlugin.recieptToImage(inputParams);
}

// enum Environments {
//   sandbox = 'sandbox',
//   testing = 'testing',
//   production = 'production',
// }

// enum AuthenticationType {
//   login = 'userenter',
//   email = 'email',
//   mobile = 'mobile',
//   jwt = 'jwt',
// }

// enum Locale {
//   default = 'default',
// }

export {
  setup,
  logout,
  reverse,
  reconcile,
  refund,
  purchase,
  initialize,
  session,
  receiptToImage,
};

export {
  Locale,
  AuthenticationType,
  Environments,
  InitializeOptions,
  PurchaseOptions,
  ReconcileOptions,
  RefundOptions,
  ReverseOptions,
  SessionOptions,
} from './types';
