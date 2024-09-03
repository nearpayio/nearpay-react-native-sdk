// errors/ReconcileErrors.ts

export class ReconcileError extends Error {
    constructor(message: string, public data?: any) {
      super(message);
      this.name = 'ReconcileError';
    }
  }
  
  export class ReconcileFailureMessage extends ReconcileError {
    static fromJson(data: any): ReconcileFailureMessage {
      return new ReconcileFailureMessage('Reconcile Failure', data);
    }
  }
  
  export class ReconcileAuthenticationFailed extends ReconcileError {
    static fromJson(data: any): ReconcileAuthenticationFailed {
      return new ReconcileAuthenticationFailed('Authentication Failed', data);
    }
  }
  
  export class ReconcileInvalidStatus extends ReconcileError {
    static fromJson(data: any): ReconcileInvalidStatus {
      return new ReconcileInvalidStatus('Invalid Status', data);
    }
  }
  
  export class ReconcileGeneralFailure extends ReconcileError {
    static fromJson(data: any): ReconcileGeneralFailure {
      return new ReconcileGeneralFailure('General Failure', data);
    }
  }
  