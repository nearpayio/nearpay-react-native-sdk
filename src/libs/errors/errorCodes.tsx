// errorCodes.ts

export const ErrorCodes = {
  authFailedCode: 401,
  generalFailureCode: 402,
  failureCode: 403,
  invalidCode: 404,
  purchaseDeclinedCode: 405,
  purchaseRejectedCode: 406,
  refundDeclinedCode: 407,
  refundRejectedCode: 408,
  alreadyLogoutCode: 409,
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
