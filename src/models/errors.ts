import { TransactionRecipt } from '@nearpaydev/nearpay-ts-sdk';

// ------------------------------------------
// --------------- Purchase -----------------
// ------------------------------------------

export enum PURCHASE_ERROR_ENUM {
  DECLIEND = 'purchase-decliend',
  REJECTED = 'purchase-rejected',
  AUTH_FAILED = 'purchase-AUTH_FAILED',
  INVALID_STATUS = 'purchase-INVALID_STATUS',
  GENERAL_ERROR = 'purchase-general-error',
}

export type PurchaseDecielnd = {
  type: PURCHASE_ERROR_ENUM.DECLIEND;
  reciepts: TransactionRecipt[];
};

export type PurchaseRejected = {
  type: PURCHASE_ERROR_ENUM.REJECTED;
  message: string;
};

export type PurchaseAuthFailed = {
  type: PURCHASE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type PurchaseInvalidStatus = {
  type: PURCHASE_ERROR_ENUM.INVALID_STATUS;
};

export type PurchaseGeneralError = {
  type: PURCHASE_ERROR_ENUM.GENERAL_ERROR;
};

export type PurchaseError =
  | PurchaseDecielnd
  | PurchaseRejected
  | PurchaseAuthFailed
  | PurchaseInvalidStatus
  | PurchaseGeneralError;

// ------------------------------------------
// ----------------- Refund -----------------
// ------------------------------------------

export enum REFUND_ERROR_ENUM {
  DECLIEND = 'refund-decliend',
  REJECTED = 'refund-rejected',
  AUTH_FAILED = 'refund-AUTH_FAILED',
  INVALID_STATUS = 'refund-INVALID_STATUS',
  GENERAL_ERROR = 'refund-general-error',
}

export type RefundDecielnd = {
  type: REFUND_ERROR_ENUM.DECLIEND;
  reciepts: TransactionRecipt[];
};

export type RefundRejected = {
  type: REFUND_ERROR_ENUM.REJECTED;
  message: string;
};

export type RefundAuthFailed = {
  type: REFUND_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type RefundInvalidStatus = {
  type: REFUND_ERROR_ENUM.INVALID_STATUS;
};
export type RefundGeneralError = {
  type: REFUND_ERROR_ENUM.GENERAL_ERROR;
};

export type RefundError =
  | RefundDecielnd
  | RefundRejected
  | RefundAuthFailed
  | RefundInvalidStatus
  | RefundGeneralError;

// ------------------------------------------
// ----------------- Reverse -----------------
// ------------------------------------------

export enum REVERSE_ERROR_ENUM {
  FAILURE_MESSAGE = 'Reverse-failure-message',
  AUTH_FAILED = 'Reverse-AUTH_FAILED',
  INVALID_STATUS = 'Reverse-INVALID_STATUS',
  GENERAL_ERROR = 'reverse-general-error',
}

export type ReverseFailureMessage = {
  type: REVERSE_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type ReverseAuthFailed = {
  type: REVERSE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type ReverseInvalidStatus = {
  type: REVERSE_ERROR_ENUM.INVALID_STATUS;
};
export type ReverseGeneralError = {
  type: REVERSE_ERROR_ENUM.GENERAL_ERROR;
};

export type ReverseError =
  | ReverseFailureMessage
  | ReverseAuthFailed
  | ReverseInvalidStatus
  | ReverseGeneralError;

// ------------------------------------------
// ----------------- Reconcile -----------------
// ------------------------------------------

export enum RECONCILE_ERROR_ENUM {
  FAILURE_MESSAGE = 'Reconcile-failure-message',
  AUTH_FAILED = 'Reconcile-AUTH_FAILED',
  INVALID_STATUS = 'Reconcile-INVALID_STATUS',
  GENERAL_ERROR = 'Reconcile-general-error',
}

export type ReconcileFailureMessage = {
  type: RECONCILE_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type ReconcileAuthFailed = {
  type: RECONCILE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type ReconcileInvalidStatus = {
  type: RECONCILE_ERROR_ENUM.INVALID_STATUS;
};
export type ReconcileGeneralError = {
  type: RECONCILE_ERROR_ENUM.GENERAL_ERROR;
};

export type ReconcileError =
  | ReconcileFailureMessage
  | ReconcileAuthFailed
  | ReconcileInvalidStatus
  | ReconcileGeneralError;

// ------------------------------------------
// ----------------- Session -----------------
// ------------------------------------------

export enum SESSION_ERROR_ENUM {
  FAILURE_MESSAGE = 'Session-failure-message',
  AUTH_FAILED = 'Session-AUTH_FAILED',
  INVALID_STATUS = 'Session-INVALID_STATUS',
  GENERAL_ERROR = 'Session-general-error',
}

export type SessionFailureMessage = {
  type: SESSION_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type SessionAuthFailed = {
  type: SESSION_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type SessionInvalidStatus = {
  type: SESSION_ERROR_ENUM.INVALID_STATUS;
};
export type SessionGeneralError = {
  type: SESSION_ERROR_ENUM.GENERAL_ERROR;
};

export type SessionError =
  | SessionFailureMessage
  | SessionAuthFailed
  | SessionInvalidStatus
  | SessionGeneralError;
