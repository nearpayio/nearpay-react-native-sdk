import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-nearpay-plugin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NearpayPlugin = NativeModules.NearpayPlugin
  ? NativeModules.NearpayPlugin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function initialize(locale: String, environment: String, authType: String, authValue : String): Promise<String> {
  return NearpayPlugin.initialize(locale, environment, authType, authValue);
}

export function purchase(amount: String, custRefNo: String,isEnableUi : boolean,isEnableReverse : boolean,finishTimeout: String,authType: String, authValue : String ): Promise<String> {
  return NearpayPlugin.purchase(amount, custRefNo, isEnableUi,isEnableReverse,finishTimeout,authType, authValue);
}

export function refund(amount: String,transactionUDID: String ,custRefNo: String,isEnableUi : boolean,isEnableReversal : boolean,isEditableReversalUI : boolean,finishTimeout: String,authType: String, authValue : String ): Promise<String> {
  return NearpayPlugin.refund(amount,transactionUDID, custRefNo, isEnableUi,isEnableReversal,isEditableReversalUI,finishTimeout,authType,authValue);
}

export function reconcile(isEnableUi : boolean ,finishTimeout: String,authType: String, authValue : String): Promise<String> {
  return NearpayPlugin.reconcile(isEnableUi,finishTimeout,authType,authValue);
}

export function reverse(transactionUDID: String,isEnableUi : boolean,finishTimeout: String,authType: String, authValue : String ): Promise<String> {
  return NearpayPlugin.reverse(transactionUDID, isEnableUi,finishTimeout,authType,authValue);
}

export function logout(): Promise<String> {
  return NearpayPlugin.logout();
}

export function setup(authType: String, authValue : String ): Promise<String> {
  return NearpayPlugin.setup(authType,authValue);
}



export enum Environments {
  sandbox = "sandbox",
  testing = "testing",
  production = "production"
  
}

export enum AuthenticationType{
  login = "userenter",
  email = "email",
  mobile = "mobile",
  jwt = "jwt"
}

export enum Locale{
  default = "default"
}
