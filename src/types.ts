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

export type PurchaseOptions = {
  amount: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  finishTimeout?: string;
};

export type RefundOptions = {
  amount: string;
  transactionUUID: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  editableReversalUI?: boolean;
  finishTimeout?: string;
  adminPin?: string;
};

export type ReconcileOptions = {
  enableReceiptUi?: boolean;
  finishTimeout?: string;
  adminPin?: string;
};

export type ReverseOptions = {
  transactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeout?: string;
};

export type SessionOptions = {
  sessionID: string;
  enableReceiptUi?: boolean;
  enableReversal?: boolean;
  finishTimeout?: string;
};
