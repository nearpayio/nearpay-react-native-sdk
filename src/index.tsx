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



function initialize(inputParams: any ): Promise<String> {
  return NearpayPlugin.initialize(inputParams);
}



function purchase(inputParams: any ): Promise<String> {
  return NearpayPlugin.purchase(inputParams);
}

 

function refund(inputParams: any ): Promise<String> {
  return NearpayPlugin.refund(inputParams);
}

function reconcile(inputParams: any): Promise<String> {
  return NearpayPlugin.reconcile(inputParams);
}

function reverse(inputParams : any ): Promise<String> {
  return NearpayPlugin.reverse(inputParams);
}

function logout(): Promise<String> {
  return NearpayPlugin.logout();
}

function setup(): Promise<String> {
  return NearpayPlugin.setup();
}

function session(inputParams : any)  : Promise<String>  {
  return NearpayPlugin.session(inputParams);
}

function receiptToImage(inputParams : any)  : Promise<String>  {
  return NearpayPlugin.recieptToImage(inputParams);
}





enum Environments {
  sandbox = "sandbox",
  testing = "testing",
  production = "production"
  
}

enum AuthenticationType{
  login = "userenter",
  email = "email",
  mobile = "mobile",
  jwt = "jwt"
}

enum Locale{
  default = "default"
}


export {
  Locale,
  AuthenticationType,
  Environments,
  setup,
  logout,
  reverse,
  reconcile,
  refund,
  purchase,
  initialize,
  session,
  receiptToImage
}