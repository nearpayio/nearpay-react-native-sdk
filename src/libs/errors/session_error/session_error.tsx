// errors/SessionErrors.ts

export class SessionError extends Error {
  constructor(message: string, public data?: any) {
    super(message);
    this.name = 'SessionError';
  }
}

export class SessionFailureMessage extends SessionError {
  static fromJson(data: any): SessionFailureMessage {
    return new SessionFailureMessage('Session Failure', data);
  }
}

export class SessionAuthenticationFailed extends SessionError {
  static fromJson(data: any): SessionAuthenticationFailed {
    return new SessionAuthenticationFailed('Authentication Failed', data);
  }
}

export class SessionInvalidStatus extends SessionError {
  static fromJson(data: any): SessionInvalidStatus {
    return new SessionInvalidStatus('Invalid Status', data);
  }
}

export class SessionGeneralFailure extends SessionError {
  static fromJson(data: any): SessionGeneralFailure {
    return new SessionGeneralFailure('General Failure', data);
  }
}
