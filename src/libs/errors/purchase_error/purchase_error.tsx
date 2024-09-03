// errors/PurchaseErrors.ts

export class PurchaseError extends Error {
    constructor(message: string, public data?: any) {
      super(message);
      this.name = 'PurchaseError';
    }
  }
  
  export class PurchaseDeclined extends PurchaseError {
    static fromJson(data: any): PurchaseDeclined {
      return new PurchaseDeclined('Purchase Declined', data);
    }
  }
  
  export class PurchaseRejected extends PurchaseError {
    static fromJson(data: any): PurchaseRejected {
      return new PurchaseRejected('Purchase Rejected', data);
    }
  }
  
  export class PurchaseAuthenticationFailed extends PurchaseError {
    static fromJson(data: any): PurchaseAuthenticationFailed {
      return new PurchaseAuthenticationFailed('Authentication Failed', data);
    }
  }
  
  export class PurchaseInvalidStatus extends PurchaseError {
    static fromJson(data: any): PurchaseInvalidStatus {
      return new PurchaseInvalidStatus('Invalid Status', data);
    }
  }
  
  export class PurchaseGeneralFailure extends PurchaseError {
    static fromJson(data: any): PurchaseGeneralFailure {
      return new PurchaseGeneralFailure('General Failure', data);
    }
  }
  
  