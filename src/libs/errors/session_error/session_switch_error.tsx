// handlers/getSessionError.ts
import { ErrorCodes } from '../errorCodes';
import {
  SessionFailureMessage,
  SessionAuthenticationFailed,
  SessionInvalidStatus,
  SessionGeneralFailure,
} from './session_error';

export function getSessionError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.authFailedCode:
      return SessionAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.failureCode:
      return SessionFailureMessage.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return SessionInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return SessionGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No session error with status ${status}`);
  }
}
