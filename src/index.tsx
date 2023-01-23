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

export function initialize(inputParams: any ): Promise<String> {
  return NearpayPlugin.initialize(inputParams);
}

export function purchase(inputParams: any ): Promise<String> {
  return NearpayPlugin.purchase(inputParams);
}

export function refund(inputParams: any ): Promise<String> {
  return NearpayPlugin.refund(inputParams);
}

export function reconcile(inputParams: any): Promise<String> {
  return NearpayPlugin.reconcile(inputParams);
}

export function reverse(inputParams : any ): Promise<String> {
  return NearpayPlugin.reverse(inputParams);
}

export function logout(): Promise<String> {
  return NearpayPlugin.logout();
}

export function setup(inputParams : any ): Promise<String> {
  return NearpayPlugin.setup(inputParams);
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
