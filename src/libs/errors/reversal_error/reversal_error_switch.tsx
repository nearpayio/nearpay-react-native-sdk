// handlers/getReversalError.ts
import { ErrorCodes } from '../errorCodes';
import {
  ReversalFailureMessage,
  ReversalAuthenticationFailed,
  ReversalInvalidStatus,
  ReversalGeneralFailure,
} from './reversal_error';

export function getReversalError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.failureCode:
      return ReversalFailureMessage.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return ReversalAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return ReversalInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return ReversalGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No reversal error with status ${status}`);
  }
}
