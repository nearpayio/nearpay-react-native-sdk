// errors/ReversalErrors.ts

export class ReversalError extends Error {
  constructor(message: string, public data?: any) {
    super(message);
    this.name = 'ReversalError';
  }
}

export class ReversalFailureMessage extends ReversalError {
  static fromJson(data: any): ReversalFailureMessage {
    return new ReversalFailureMessage('Reversal Failure', data);
  }
}

export class ReversalAuthenticationFailed extends ReversalError {
  static fromJson(data: any): ReversalAuthenticationFailed {
    return new ReversalAuthenticationFailed('Authentication Failed', data);
  }
}

export class ReversalInvalidStatus extends ReversalError {
  static fromJson(data: any): ReversalInvalidStatus {
    return new ReversalInvalidStatus('Invalid Status', data);
  }
}

export class ReversalGeneralFailure extends ReversalError {
  static fromJson(data: any): ReversalGeneralFailure {
    return new ReversalGeneralFailure('General Failure', data);
  }
}
