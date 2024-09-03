// handlers/getPurchaseError.ts
import { ErrorCodes } from '../errorCodes';
import {
  PurchaseDeclined,
  PurchaseRejected,
  PurchaseAuthenticationFailed,
  PurchaseInvalidStatus,
  PurchaseGeneralFailure,
} from './purchase_error';

export function getPurchaseError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.purchaseDeclinedCode:
      return PurchaseDeclined.fromJson(nativeResponse);
    case ErrorCodes.purchaseRejectedCode:
      return PurchaseRejected.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return PurchaseAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return PurchaseInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return PurchaseGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No purchase error with status ${status}`);
  }
}
