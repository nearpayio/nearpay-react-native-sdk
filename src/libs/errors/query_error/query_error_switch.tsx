// handlers/getQueryError.ts
import { ErrorCodes } from '../errorCodes';
import {
  QueryFailureMessage,
  QueryAuthenticationFailed,
  QueryInvalidStatus,
  QueryGeneralFailure,
} from './query_error';

export function getQueryError(nativeResponse: {
  status: number;
  [key: string]: any;
}) {
  const status = nativeResponse.status;

  switch (status) {
    case ErrorCodes.failureCode:
      return QueryFailureMessage.fromJson(nativeResponse);
    case ErrorCodes.authFailedCode:
      return QueryAuthenticationFailed.fromJson(nativeResponse);
    case ErrorCodes.invalidCode:
      return QueryInvalidStatus.fromJson(nativeResponse);
    case ErrorCodes.generalFailureCode:
      return QueryGeneralFailure.fromJson(nativeResponse);
    default:
      throw new Error(`No query error with status ${status}`);
  }
}
