// handlers/getUserSessionError.ts
import { ErrorCodes } from '../errorCodes';
import {
  UserSessionFailureMessage,
  UserSessionAuthenticationFailed,
  UserSessionInvalidStatus,
  UserSessionGeneralFailure,
} from './user_session_error';

export function getUserSessionError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.failureCode:
      return UserSessionFailureMessage.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return UserSessionAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return UserSessionInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return UserSessionGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No user session error with status ${status}`);
  }
}
