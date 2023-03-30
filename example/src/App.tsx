import React, { Component } from 'react';

import { Button, StyleSheet, View } from 'react-native';
import {
  Nearpay,
  AuthenticationType,
  Environments,
} from 'react-native-nearpay-plugin';
import Toast from 'react-native-toast-message';

// userenter,email,mobile,jwt
let authtype = AuthenticationType.email;
let authvalue = 'f.alhajeri@nearpay.io';
let environment = Environments.sandbox;
//Time out n seconds
let timeout = 60;

export default class App extends Component {
  private nearpay: Nearpay = new Nearpay({
    authtype,
    authvalue,
    environment,
  });

  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: false,
      currentState: 'not-panic',
    };

    // var reqData = {
    //   authtype: authType,
    //   authvalue: authValue,
    //   locale: Locale.default,
    //   environment: Environments.sandbox,
    // };
    // Nearpay.initialize(reqData).then((response) => {
    //   let resultJSON = JSON.parse(response);
    //   console.log(resultJSON.message, ',,,,data....', resultJSON.status);
    //   if (resultJSON.status == 200) {
    //     this.showToast('success', 'initializ Success', resultJSON.message);
    //   } else {
    //     this.showToast('error', 'initializ Failed', resultJSON.message);
    //   }
    // });
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
    this.doPurchase()
      .then((response) => {
        let resultJSON = JSON.parse(response);
        if (resultJSON.status == 200) {
          this.showToast('success', 'Purchase Success', resultJSON.messsage);
        } else {
          this.showToast('error', 'Purchase Failed', resultJSON.message);
        }
      })
      .catch((e) => console.log({ e }));
  }

  initiatePurchaseAndRefund() {
    this.doPurchase().then((response) => {
      var responseJson = JSON.parse(response);
      var purchaseList = responseJson.list;

      setTimeout(() => {
        console.log(purchaseList.length, 'paymentresponse', purchaseList);
        if (purchaseList.length) {
          let uuid = purchaseList[0].uuid;
          console.log('response list', uuid);
          this.initiateRefund(uuid);
        }
      }, 5000);
    });
  }

  initiateRefund(uuid: string) {
    this.nearpay
      .refund({
        amount: 100, // [Required]
        transactionUUID: uuid, // [Required]
        customerReferenceNumber: 'rerretest123333333', //[Optional]
        enableReceiptUi: true, // [Optional]
        enableReversal: true, // [Optional]
        editableReversalUI: true, // [Optional]
        finishTimeout: timeout, // [Optional]
        adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        var resultJSON = JSON.parse(response);
        console.log('initialize refund', JSON.stringify(resultJSON, null, 2));
        if (resultJSON.status == 200) {
          this.showToast('success', 'Refund Success', resultJSON.message);
        } else {
          this.showToast('error', 'Refund Failed', resultJSON.message);
        }
      });
  }

  initiateReconcile() {
    this.nearpay
      .reconcile({
        enableReceiptUi: true, // Optional
        finishTimeout: timeout, // Optional
        adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
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
    this.doPurchase().then((response) => {
      var responseJson = JSON.parse(response);
      var purchaseList = responseJson.list;

      setTimeout(() => {
        console.log(purchaseList.length, 'paymentresponse', purchaseList);
        if (purchaseList.length) {
          let uuid = purchaseList[0].uuid;
          console.log('...response list...uuid------$uuid..333..', uuid);
          this.initiateReverse(uuid);
        }
      }, 5000);
    });
  }

  initiateReverse(uuid: string) {
    this.nearpay
      .reverse({
        transactionUUID: uuid, // Required
        enableReceiptUi: true, // Optional
        finishTimeout: timeout, // Optional
      })
      .then((response) => {
        var resultJSON = JSON.parse(response);
        console.log('initialise Reverse', JSON.stringify(resultJSON, null, 2));
        if (resultJSON.status == 200) {
          this.showToast('success', 'Reverse Success', resultJSON.message);
        } else {
          this.showToast('error', 'Reverse Failed', resultJSON.message);
        }
      });
  }

  async doPurchase() {
    console.log({ nearpay: this.nearpay, purchase: this.nearpay.purchase });

    return this.nearpay
      .purchase({
        amount: 100, // Required
        customerReferenceNumber: 'uuyuyuyuy65565675', // Optional
        enableReceiptUi: true, //Optional
        enableReversal: true, //it will allow you to enable or disable the reverse button
        finishTimeout: timeout, //Optional
      })
      .then((response) => {
        console.log('purchase');

        // var responseJson = JSON.parse(response);
        // var status = responseJson.status;
        // var message = responseJson.message;

        // console.log({
        //   purchase_response: JSON.stringify(responseJson, null, 2),
        //   status,
        //   message,
        // });

        // if (status !== 200) {
        //   this.showToast('error', 'Purchase Failed', responseJson.message);
        //   throw `purchase failed`;
        // }

        return response;
      });
  }

  doLogout() {
    this.nearpay.logout().then((response) => {
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
    this.nearpay.setup().then((response) => {
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
    this.nearpay
      .session({
        sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
        enableReceiptUi: true, //Optional
        enableReversal: true,
        finishTimeout: timeout, // Optional
      })
      .then((response) => {
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
          <Button
            title="Test"
            onPress={() => console.log('test', this.nearpay)}
          />
        </View>
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
