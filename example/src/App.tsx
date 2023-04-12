import React, { Component, useEffect, useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import {
  AuthenticationType,
  CONNECTION_STATE,
  EmbededNearpay,
  Environments,
  NEARPAY_CONNECTOR,
  NearpayProvider,
  RemoteNearPay,
} from 'react-native-nearpay-plugin';
import ProxySide from './components/ProxySide';

// userenter,email,mobile,jwt
let authtype = AuthenticationType.email;
let authvalue = 'f.alhajeri@nearpay.io';
let environment = Environments.sandbox;
//Time out n seconds
let timeout = 60;
const embededNearpay: EmbededNearpay = new EmbededNearpay({
  authtype,
  authvalue,
  environment,
});

const remoteNearpay: RemoteNearPay = new RemoteNearPay();
remoteNearpay.addAutoReconnect();
remoteNearpay.connectToLastUser();

export default function App() {
  const [connectionState, setConnectionState] = useState<CONNECTION_STATE>(
    CONNECTION_STATE.LOGGED_OUT
  );

  useEffect(() => {
    const remover = remoteNearpay.addConnectivityListener(setConnectionState);

    return () => {
      remover();
    };
  }, [remoteNearpay]);

  function showToast(type: any, title: any, message: any) {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  }

  function initiatePurchase() {
    console.log('initializePayment', 'response');
    doPurchase()
      .then((response) => {
        let resultJSON = JSON.parse(response);
        if (resultJSON.status == 200) {
          showToast('success', 'Purchase Success', resultJSON.messsage);
        } else {
          showToast('error', 'Purchase Failed', resultJSON.message);
        }
      })
      .catch((e) => console.log({ e }));
  }

  function initiatePurchaseAndRefund() {
    doPurchase().then((response) => {
      var responseJson = JSON.parse(response);
      var purchaseList = responseJson.list;

      setTimeout(() => {
        console.log(purchaseList.length, 'paymentresponse', purchaseList);
        if (purchaseList.length) {
          let uuid = purchaseList[0].uuid;
          console.log('response list', uuid);
          initiateRefund(uuid);
        }
      }, 5000);
    });
  }

  function initiateRefund(uuid: string) {
    embededNearpay
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
          showToast('success', 'Refund Success', resultJSON.message);
        } else {
          showToast('error', 'Refund Failed', resultJSON.message);
        }
      });
  }

  function initiateReconcile() {
    embededNearpay
      .reconcile({
        enableReceiptUi: true, // Optional
        finishTimeout: timeout, // Optional
        adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        console.log('initialisePayment', response);
        var resultJSON = JSON.parse(response);
        if (resultJSON.status == 200) {
          showToast('success', 'Reconcile Success', resultJSON.message);
        } else {
          showToast('error', 'Reconcile Failed', resultJSON.message);
        }
      });
  }

  function initiatePurchaseAndReverse() {
    doPurchase().then((response) => {
      var responseJson = JSON.parse(response);
      var purchaseList = responseJson.list;

      setTimeout(() => {
        console.log(purchaseList.length, 'paymentresponse', purchaseList);
        if (purchaseList.length) {
          let uuid = purchaseList[0].uuid;
          console.log('...response list...uuid------$uuid..333..', uuid);
          initiateReverse(uuid);
        }
      }, 5000);
    });
  }

  function initiateReverse(uuid: string) {
    embededNearpay
      .reverse({
        transactionUUID: uuid, // Required
        enableReceiptUi: true, // Optional
        finishTimeout: timeout, // Optional
      })
      .then((response) => {
        var resultJSON = JSON.parse(response);
        console.log('initialise Reverse', JSON.stringify(resultJSON, null, 2));
        if (resultJSON.status == 200) {
          showToast('success', 'Reverse Success', resultJSON.message);
        } else {
          showToast('error', 'Reverse Failed', resultJSON.message);
        }
      });
  }

  async function doPurchase() {
    return embededNearpay
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
        //   showToast('error', 'Purchase Failed', responseJson.message);
        //   throw `purchase failed`;
        // }

        return response;
      });
  }

  function doLogout() {
    embededNearpay.logout().then((response) => {
      console.log('doLogoutAction', response);
      var resultJSON = JSON.parse(response);
      console.log('doLogoutAction', resultJSON.message);
      if (resultJSON.status == 200) {
        showToast('success', 'Logout Success', resultJSON.message);
      } else {
        showToast('error', 'Logout Failed', resultJSON.message);
      }
    });
  }

  function doSetupClick() {
    embededNearpay.setup().then((response) => {
      console.log('doSetupClick', response);
      var resultJSON = JSON.parse(response);
      console.log('doSetupClick', resultJSON.messsage);
      if (resultJSON.status == 200) {
        showToast('success', 'Setup Success', resultJSON.messsage);
      } else {
        showToast('error', 'Setup Failed', resultJSON.messsage);
      }
    });
  }

  function doSession() {
    embededNearpay
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
          showToast('success', 'Session Success', resultJSON.message);
        } else {
          showToast('error', 'Session Failed', resultJSON.message);
        }
      });
  }

  return (
    <NearpayProvider nearpay={remoteNearpay}>
      <View style={styles.container}>
        <View style={styles.containerrow}>
          <Button
            title="Test"
            onPress={() => console.log({ NEARPAY_CONNECTOR })}
          />
        </View>

        <View style={styles.containerrow}>
          <Button title="Purchase" onPress={() => initiatePurchase()} />
        </View>
        <View style={styles.containerrow}>
          <Button
            title="Purchase and Refund "
            onPress={() => initiatePurchaseAndRefund()}
          />
        </View>
        <View style={styles.containerrow}>
          <Button
            title="Purchase and Reverse "
            onPress={() => initiatePurchaseAndReverse()}
          />
        </View>
        <View style={styles.containerrow}>
          <Button title="Reconcile" onPress={() => initiateReconcile()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Setup" onPress={() => doSetupClick()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Logout" onPress={() => doLogout()} />
        </View>
        <View style={styles.containerrow}>
          <Button title="Session" onPress={() => doSession()} />
        </View>

        {/* Proxy side */}
        <View style={styles.hr}></View>
        <ProxySide />
        {/* <View style={styles.containerrow}>
        <Button title='show/hide' onPress={}/>
        <Button
          title="connect"
          onPress={() => {
            remoteNearpay
              .connect({
                type: NEARPAY_CONNECTOR.WS,
                ip: '172.20.10.4',
                port: '8080',
              })
              .then((res) => {
                console.log({ success: res });
              })
              .catch((e) => {
                console.log({ err: e });
              });
          }}
        />
      </View>
      <View style={styles.containerrow}>
        <Text>connection state: {connectionState}</Text>
      </View>
      {connectionState === CONNECTION_STATE.CONNECTED && (
        <View style={styles.containerrow}>
          <TextInput></TextInput>
        </View>
      )} */}
        <Toast />
      </View>
    </NearpayProvider>
  );
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
  hr: {
    height: 10,
    width: '70%',
    backgroundColor: 'black',
  },
});
