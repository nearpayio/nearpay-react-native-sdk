// handlers/getReconcileError.ts
import { ErrorCodes } from '../errorCodes';
import {
  ReconcileFailureMessage,
  ReconcileAuthenticationFailed,
  ReconcileInvalidStatus,
  ReconcileGeneralFailure,
} from './reconcile_error';

export function getReconcileError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.failureCode:
      return ReconcileFailureMessage.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return ReconcileAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return ReconcileInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return ReconcileGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No reconcile error with status ${status}`);
  }
}
