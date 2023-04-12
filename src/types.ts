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
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  finishTimeout?: number;
};

export type EmbededRefundOptions = {
  amount: number;
  transactionUUID: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  editableReversalUI?: boolean;
  finishTimeout?: number;
  adminPin?: string;
};

export type EmbededReconcileOptions = {
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  adminPin?: string;
};

export type ReverseOptions = {
  transactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeout?: number;
};

export type SessionOptions = {
  sessionID: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  finishTimeout?: number;
};
