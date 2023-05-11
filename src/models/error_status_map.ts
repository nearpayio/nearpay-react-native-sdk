import { TransactionRecipt } from '@nearpaydev/nearpay-ts-sdk';
import { ApiResponse } from './ApiResponse';
import {
  PURCHASE_ERROR_ENUM,
  PurchaseAuthFailed,
  PurchaseDecielnd,
  PurchaseError,
  PurchaseGeneralError,
  PurchaseInvalidStatus,
  PurchaseRejected,
  RECONCILE_ERROR_ENUM,
  REFUND_ERROR_ENUM,
  REVERSE_ERROR_ENUM,
  ReconcileAuthFailed,
  ReconcileError,
  ReconcileFailureMessage,
  ReconcileGeneralError,
  ReconcileInvalidStatus,
  RefundAuthFailed,
  RefundDecielnd,
  RefundError,
  RefundGeneralError,
  RefundInvalidStatus,
  RefundRejected,
  ReverseAuthFailed,
  ReverseError,
  ReverseFailureMessage,
  ReverseGeneralError,
  ReverseInvalidStatus,
  SESSION_ERROR_ENUM,
  SessionAuthFailed,
  SessionError,
  SessionFailureMessage,
  SessionGeneralError,
  SessionInvalidStatus,
} from './errors';

// ------------------------------------------
// --------------- Purchase -----------------
// ------------------------------------------

export function PurchaseErrorMap(response: ApiResponse): PurchaseError {
  switch (response.status) {
    case 405:
      return {
        type: PURCHASE_ERROR_ENUM.DECLIEND,
        reciepts: response.receipts as TransactionRecipt[],
      } as PurchaseDecielnd;

    case 406:
      return {
        type: PURCHASE_ERROR_ENUM.REJECTED,
        message: response.message!,
      } as PurchaseRejected;

    case 401:
      return {
        type: PURCHASE_ERROR_ENUM.AUTH_FAILED,
        message: response.message!,
      } as PurchaseAuthFailed;

    case 404:
      return {
        type: PURCHASE_ERROR_ENUM.INVALID_STATUS,
      } as PurchaseInvalidStatus;

    case 402:
      return {
        type: PURCHASE_ERROR_ENUM.GENERAL_ERROR,
      } as PurchaseGeneralError;

    default:
      throw `invalid status`;
  }
}
// ------------------------------------------
// ----------------- Refund -----------------
// ------------------------------------------

export function RefundErrorMap(response: ApiResponse): RefundError {
  switch (response.status) {
    case 405:
      return {
        type: REFUND_ERROR_ENUM.DECLIEND,
        reciepts: response.receipts as TransactionRecipt[],
      } as RefundDecielnd;

    case 406:
      return {
        type: REFUND_ERROR_ENUM.REJECTED,
        message: response.message!,
      } as RefundRejected;

    case 401:
      return {
        type: REFUND_ERROR_ENUM.AUTH_FAILED,
        message: response.message!,
      } as RefundAuthFailed;

    case 404:
      return {
        type: REFUND_ERROR_ENUM.INVALID_STATUS,
      } as RefundInvalidStatus;

    case 402:
      return {
        type: REFUND_ERROR_ENUM.GENERAL_ERROR,
      } as RefundGeneralError;

    default:
      throw `invalid status`;
  }
}

// ------------------------------------------
// ----------------- Reverse -----------------
// ------------------------------------------

export function ReverseErrorMap(response: ApiResponse): ReverseError {
  switch (response.status) {
    case 401:
      return {
        type: REVERSE_ERROR_ENUM.AUTH_FAILED,
        message: response.message!,
      } as ReverseAuthFailed;

    case 403:
      return {
        type: REVERSE_ERROR_ENUM.FAILURE_MESSAGE,
        message: response.message!,
      } as ReverseFailureMessage;

    case 404:
      return {
        type: REVERSE_ERROR_ENUM.INVALID_STATUS,
      } as ReverseInvalidStatus;

    case 402:
      return {
        type: REVERSE_ERROR_ENUM.GENERAL_ERROR,
      } as ReverseGeneralError;

    default:
      throw `invalid status`;
  }
}

// ------------------------------------------
// ----------------- Reconcile --------------
// ------------------------------------------

export function ReconcileErrorMap(response: ApiResponse): ReconcileError {
  switch (response.status) {
    case 401:
      return {
        type: RECONCILE_ERROR_ENUM.AUTH_FAILED,
        message: response.message!,
      } as ReconcileAuthFailed;

    case 403:
      return {
        type: RECONCILE_ERROR_ENUM.FAILURE_MESSAGE,
        message: response.message!,
      } as ReconcileFailureMessage;

    case 404:
      return {
        type: RECONCILE_ERROR_ENUM.INVALID_STATUS,
      } as ReconcileInvalidStatus;

    case 402:
      return {
        type: RECONCILE_ERROR_ENUM.GENERAL_ERROR,
      } as ReconcileGeneralError;

    default:
      throw `invalid status`;
  }
}
// ------------------------------------------
// ----------------- Reconcile --------------
// ------------------------------------------

export function SessionErrorMap(response: ApiResponse): SessionError {
  switch (response.status) {
    case 401:
      return {
        type: SESSION_ERROR_ENUM.AUTH_FAILED,
        message: response.message!,
      } as SessionAuthFailed;

    case 403:
      return {
        type: SESSION_ERROR_ENUM.FAILURE_MESSAGE,
        message: response.message!,
      } as SessionFailureMessage;

    case 404:
      return {
        type: SESSION_ERROR_ENUM.INVALID_STATUS,
      } as SessionInvalidStatus;

    case 402:
      return {
        type: SESSION_ERROR_ENUM.GENERAL_ERROR,
      } as SessionGeneralError;

    default:
      throw `invalid status`;
  }
}
