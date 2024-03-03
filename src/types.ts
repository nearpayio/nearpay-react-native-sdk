import {
  SessionData,
  TransactionData,
  TransactionReceipt,
} from '@nearpaydev/nearpay-ts-sdk';

export enum Environments {
  sandbox = 'sandbox',
  testing = 'testing',
  production = 'production',
}

export enum AuthenticationType {
  login = 'userenter',
  email = 'email',
  mobile = 'mobile',
  jwt = 'jwt',
}

export enum Locale {
  default = 'default',
}

export enum NetworkConfig {
  SIM_ONLY = 'SIM_ONLY',
  SIM_PREFERRED = 'SIM_PREFERRED',
  DEFAULT = 'DEFAULT',
}

export enum UIPosition {
  TOP_START = 'TOP_START',
  TOP_END = 'TOP_END',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_START = 'BOTTOM_START',
  BOTTOM_END = 'BOTTOM_END',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  CENTER_START = 'CENTER_START',
  CENTER_END = 'CENTER_END',
  CENTER_RIGHT = 'CENTER_RIGHT',
  CENTER_LEFT = 'CENTER_LEFT',
  CENTER_TOP = 'CENTER_TOP',
  CENTER_BOTTOM = 'CENTER_BOTTOM',
  CENTER = 'CENTER',
  DEFAULT = 'DEFAULT',
}

export type InitializeOptions = {
  authtype: AuthenticationType;
  authvalue: string;
  environment: Environments;
  locale?: Locale;
  networkConfig?: NetworkConfig;
  arabicPaymentText?: string;
  englishPaymentText?: string;
  uiPosition?: UIPosition;
  loadingUi?: boolean;
};

export type EmbededPurchaseOptions = {
  amount: number;
  transactionId?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
};

export type EmbededRefundOptions = {
  amount: number;
  originalTransactionUUID: string;
  transactionId?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  editableRefundAmountUI?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
  adminPin?: string;
};

export type EmbededReconcileOptions = {
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  adminPin?: string;
  enableUiDismiss?: boolean;
};

export type EmbededReverseOptions = {
  originalTransactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
};

export type EmbededSessionOptions = {
  sessionID: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
};

export type EmbededUpdateAuthenticationOptions = {
  authtype: AuthenticationType;
  authvalue: string;
};

export type EmbededReceiptToImageOptions = {
  receipt: TransactionReceipt;
  receiptWidth?: number;
  receiptFontSize?: number;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=- Queries =-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=

export type EmbededGetTransactionsListOptions = {
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

export type EmbededGetTransactionOptions = {
  transactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeOut?: number;
};

export type EmbededGetReconciliationsListOptions = {
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

export type EmbededGetReconciliationOptions = {
  reconciliationUUID: string;
  enableReceiptUi?: boolean;
  finishTimeOut?: number;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=- responses =-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=

export type SessionResponse =
  | { session_closed: true; data: SessionData }
  | { session_closed: false; data: TransactionData };
