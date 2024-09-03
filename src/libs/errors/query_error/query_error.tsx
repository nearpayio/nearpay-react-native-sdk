// errors/QueryErrors.ts

export class QueryError extends Error {
    constructor(message: string, public data?: any) {
      super(message);
      this.name = 'QueryError';
    }
  }
  
  export class QueryFailureMessage extends QueryError {
    static fromJson(data: any): QueryFailureMessage {
      return new QueryFailureMessage('Query Failure', data);
    }
  }
  
  export class QueryAuthenticationFailed extends QueryError {
    static fromJson(data: any): QueryAuthenticationFailed {
      return new QueryAuthenticationFailed('Authentication Failed', data);
    }
  }
  
  export class QueryInvalidStatus extends QueryError {
    static fromJson(data: any): QueryInvalidStatus {
      return new QueryInvalidStatus('Invalid Status', data);
    }
  }
  
  export class QueryGeneralFailure extends QueryError {
    static fromJson(data: any): QueryGeneralFailure {
      return new QueryGeneralFailure('General Failure', data);
    }
  }
  