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

export type InitializeOptions = {
  authtype: AuthenticationType;
  authvalue: string;
  locale?: Locale;
  environment: Environments;
};

export type EmbededPurchaseOptions = {
  amount: number;
  transactionUUID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
};

export type EmbededRefundOptions = {
  amount: number;
  originalTransactionUUID: string;
  transactionUUID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  editableReversalAmountUI?: boolean;
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

export type EmbededGetTransactionsOptions = {
  page?: number;
  limit?: number;
};

export type EmbededGetTransactionOptions = {
  transactionUUID: string;
};

export type EmbededGetReconciliationsOptions = {
  page?: number;
  limit?: number;
};

export type EmbededGetReconciliationOptions = {
  reconciliationUUID: string;
};
