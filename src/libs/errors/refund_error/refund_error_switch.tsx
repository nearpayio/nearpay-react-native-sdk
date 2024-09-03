// handlers/getRefundError.ts
import { ErrorCodes } from '../errorCodes';
import {
  RefundDeclined,
  RefundRejected,
  RefundAuthenticationFailed,
  RefundInvalidStatus,
  RefundGeneralFailure,
} from './refund_error';

export function getRefundError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.refundDeclinedCode:
      return RefundDeclined.fromJson(nativeResponse);
    case ErrorCodes.refundRejectedCode:
      return RefundRejected.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return RefundAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return RefundInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return RefundGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No refund error with status ${status}`);
  }
}
