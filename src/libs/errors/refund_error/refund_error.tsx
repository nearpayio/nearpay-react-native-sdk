// errors/RefundErrors.ts

export class RefundError extends Error {
    constructor(message: string, public data?: any) {
      super(message);
      this.name = 'RefundError';
    }
  }
  
  export class RefundDeclined extends RefundError {
    static fromJson(data: any): RefundDeclined {
      return new RefundDeclined('Refund Declined', data);
    }
  }
  
  export class RefundRejected extends RefundError {
    static fromJson(data: any): RefundRejected {
      return new RefundRejected('Refund Rejected', data);
    }
  }
  
  export class RefundAuthenticationFailed extends RefundError {
    static fromJson(data: any): RefundAuthenticationFailed {
      return new RefundAuthenticationFailed('Authentication Failed', data);
    }
  }
  
  export class RefundInvalidStatus extends RefundError {
    static fromJson(data: any): RefundInvalidStatus {
      return new RefundInvalidStatus('Invalid Status', data);
    }
  }
  
  export class RefundGeneralFailure extends RefundError {
    static fromJson(data: any): RefundGeneralFailure {
      return new RefundGeneralFailure('General Failure', data);
    }
  }
  