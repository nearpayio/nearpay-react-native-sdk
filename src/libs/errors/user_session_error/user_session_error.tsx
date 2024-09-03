// errors/UserSessionErrors.ts

export class UserSessionError extends Error {
    constructor(message: string, public data?: any) {
      super(message);
      this.name = 'UserSessionError';
    }
  }
  
  export class UserSessionFailureMessage extends UserSessionError {
    static fromJson(data: any): UserSessionFailureMessage {
      return new UserSessionFailureMessage('User Session Failure', data);
    }
  }
  
  export class UserSessionAuthenticationFailed extends UserSessionError {
    static fromJson(data: any): UserSessionAuthenticationFailed {
      return new UserSessionAuthenticationFailed('Authentication Failed', data);
    }
  }
  
  export class UserSessionInvalidStatus extends UserSessionError {
    static fromJson(data: any): UserSessionInvalidStatus {
      return new UserSessionInvalidStatus('Invalid Status', data);
    }
  }
  
  export class UserSessionGeneralFailure extends UserSessionError {
    static fromJson(data: any): UserSessionGeneralFailure {
      return new UserSessionGeneralFailure('General Failure', data);
    }
  }
  