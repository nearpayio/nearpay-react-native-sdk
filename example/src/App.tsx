import React, { Component } from 'react';

import { Button, StyleSheet, View } from 'react-native';
import * as Nearpay from 'react-native-nearpay-plugin';
import Toast from 'react-native-toast-message';

// userenter,email,mobile,jwt
let authType = Nearpay.AuthenticationType.email;

let authValue = '<your auth value>';
//Time out n seconds
let timeout = '60';

export default class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: false,
      currentState: 'not-panic',
    };
    var reqData = {
      authtype: authType,
      authvalue: authValue,
      locale: Nearpay.Locale.default,
      environment: Nearpay.Environments.sandbox,
    };
    Nearpay.initialize(reqData).then((response) => {
      let resultJSON = JSON.parse(response);
      console.log(resultJSON.message, ',,,,data....', resultJSON.status);
      if (resultJSON.status == 200) {
        this.showToast('success', 'initializ Success', resultJSON.message);
      } else {
        this.showToast('error', 'initializ Failed', resultJSON.message);
      }
    });
  }

  showToast(type: any, title: any, message: any) {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  }

  initiatePurchase() {
    console.log('initializePayment', 'response');
    Nearpay.purchase({
      amount: '0001', // Required
      customerReferenceNumber: 'uuyuyuyuy65565675', // [optional] any number you want to add as a refrence
      enableReceiptUi: true, // [optional] true will enable the ui and false will disable
      enableReversal: true, // it will allow you to enable or disable the reverse button
      finishTimeout: timeout, // [optional] Add the number of seconds
    }).then((response) => {
      let resultJSON = JSON.parse(response);
      console.log(resultJSON, 'initializePayment', resultJSON.message);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Purchase Success', resultJSON.messsage);
      } else {
        this.showToast('error', 'Purchase Failed', resultJSON.message);
      }
    });
  }

  initiatePurchaseAndRefund() {
    Nearpay.purchase({
      amount: '0001',
      customerReferenceNumber: '', // Any string as a reference number
      enableReceiptUi: true, // Optional
      enableReversal: true, // Optional it will allow you to enable or disable the reverse button
      finishTimeout: timeout, //Optional
    }).then((response) => {
      var responseJson = JSON.parse(response);
      var status = responseJson.status;
      var message = responseJson.message;
      if (status == 200) {
        var purchaseList = responseJson.list;
        setTimeout(() => {
          console.log(purchaseList.length, 'paymentresponse', purchaseList);
          if (purchaseList.length) {
            let uuid = purchaseList[0].uuid;
            console.log('response list', uuid);
            this.initiateRefund(uuid);
          }
        }, 5000);
      } else {
        this.showToast('error', 'Purchase Failed', responseJson.message);
      }
      console.log('initialisePayment', response);
    });
  }

  initiateRefund(uuid: string) {
    Nearpay.refund({
      amount: '0001', // Required
      transactionUUID: uuid, // Required
      customerReferenceNumber: 'rerretest123333333', //Optional
      enableReceiptUi: true, // Optional
      enableReversal: true, // Optional
      editableReversalUI: true, // Optional
      finishTimeout: timeout, // Optional
      adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
    }).then((response) => {
      console.log('initializePayment', response);
      var resultJSON = JSON.parse(response);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Refund Success', resultJSON.message);
      } else {
        this.showToast('error', 'Refund Failed', resultJSON.message);
      }
    });
  }

  initiateReconcile() {
    Nearpay.reconcile({
      enableReceiptUi: true, // Optional
      finishTimeout: timeout, // Optional
      adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
    }).then((response) => {
      console.log('initialisePayment', response);
      var resultJSON = JSON.parse(response);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Reconcile Success', resultJSON.message);
      } else {
        this.showToast('error', 'Reconcile Failed', resultJSON.message);
      }
    });
  }

  initiatePurchaseAndReverse() {
    Nearpay.purchase({
      amount: '0001', // Required
      customerReferenceNumber: 'uuyuyuyuy65565675', // Optional
      enableReceiptUi: true, //Optional
      enableReversal: true, //it will allow you to enable or disable the reverse button
      finishTimeout: timeout, //Optional
    }).then((response) => {
      console.log('....initiatePurchaseAndReverse....$response', response);
      var responseJson = JSON.parse(response);
      var status = responseJson.status;
      var message = responseJson.message;
      if (status == 200) {
        var purchaseList = responseJson.list;
        setTimeout(() => {
          console.log(purchaseList.length, 'paymentresponse', purchaseList);
          if (purchaseList.length) {
            let uuid = purchaseList[0].uuid;
            console.log('...response list...uuid------$uuid..333..', uuid);
            this.doReverse(uuid);
          }
        }, 5000);
      } else {
        this.showToast('error', 'Purchase Failed', responseJson.message);
      }
      console.log('.....initialisePayment......44.......', response);
    });
  }

  doReverse(uuid: string) {
    Nearpay.reverse({
      transactionUUID: uuid, // Required
      enableReceiptUi: true, // Optional
      finishTimeout: timeout, // Optional
    }).then((response) => {
      console.log('initialisePayment', response);
      var resultJSON = JSON.parse(response);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Reverse Success', resultJSON.message);
      } else {
        this.showToast('error', 'Reverse Failed', resultJSON.message);
      }
    });
  }

  doLogout() {
    Nearpay.logout().then((response) => {
      console.log('doLogoutAction', response);
      var resultJSON = JSON.parse(response);
      console.log('doLogoutAction', resultJSON.message);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Logout Success', resultJSON.message);
      } else {
        this.showToast('error', 'Logout Failed', resultJSON.message);
      }
    });
  }

  doSetupClick() {
    Nearpay.setup().then((response) => {
      console.log('doSetupClick', response);
      var resultJSON = JSON.parse(response);
      console.log('doSetupClick', resultJSON.messsage);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Setup Success', resultJSON.messsage);
      } else {
        this.showToast('error', 'Setup Failed', resultJSON.messsage);
      }
    });
  }

  doSession() {
    Nearpay.session({
      sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
      enableReceiptUi: true, //Optional
      enableReversal: true,
      finishTimeout: timeout, // Optional
    }).then((response) => {
      console.log('doSession', response);
      var resultJSON = JSON.parse(response);
      if (resultJSON.status == 200) {
        this.showToast('success', 'Session Success', resultJSON.message);
      } else {
        this.showToast('error', 'Session Failed', resultJSON.message);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerrow}>
          <Button title="Purchase" onPress={() => this.initiatePurchase()} />
        </View>
        <View style={styles.containerrow}>
          <Button
            title="Purchase and Refund "
            onPress={() => this.initiatePurchaseAndRefund()}
          />
        </View>
        <View style={styles.containerrow}>
          <Button
            title="Purchase and Reverse "
            onPress={() => this.initiatePurchaseAndReverse()}
          />
        </View>
        <View style={styles.containerrow}>
          <Button title="Reconcile" onPress={() => this.initiateReconcile()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Setup" onPress={() => this.doSetupClick()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Logout" onPress={() => this.doLogout()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Session" onPress={() => this.doSession()} />
        </View>
        <Toast />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerrow: {
    flexDirection: 'row',
    //marginBottom : 10,
    marginBottom: '5%',
  },
  buttonContainer: {
    flex: 1,
  },
});
