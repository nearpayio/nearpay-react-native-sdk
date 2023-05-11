import React, { useRef } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
} from 'react-native-nearpay-sdk';
import { v4 as uuidv4 } from 'uuid';

// userenter,email,mobile,jwt
let authtype = AuthenticationType.email;
let authvalue = 'f.alhajeri@nearpay.io';
let environment = Environments.sandbox;
//Time out n seconds
let timeout = 60;
// const embededNearpay: EmbededNearpay = new EmbededNearpay({
//   authtype,
//   authvalue,
//   environment,
// });
const isAndroid = Platform.select({ android: true });

export default function EmbededSide() {
  const embededNearpay = useRef(
    Platform.select({ android: true })
      ? new EmbededNearpay({
          authtype,
          authvalue,
          environment,
        })
      : undefined
  );

  async function doPurchase(amount: number) {
    console.log(`=-=-=-= purchse start =-=-=-=`);
    return embededNearpay.current!.purchase({
      amount: amount, // Required
      transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
      customerReferenceNumber: '', // [Optional] referance nuber for customer use only
      enableReceiptUi: true, // [Optional] show the reciept in ui
      enableReversalUi: true, //[Optional] enable reversal of transaction from ui
      finishTimeout: timeout, //[Optional] finish timeout in seconds
      enableUiDismiss: true, //[Optional] the ui is dimissible
      onPurchaseSuccess: (reciepts) => {
        console.log(`=-=-=-= purchse success =-=-=-=`);
        console.log({ reciepts });
      },
      onPurchaseFailed: (err) => {
        console.log(`=-=-=-= purchse failed =-=-=-=`);
      },
    });
  }

  // function doRefund(amount: number, uuid: string) {
  //   console.log(`=-=-=-= refund start =-=-=-=`);
  //   embededNearpay
  //     .current!.refund({
  //       amount: amount, // [Required]
  //       originalTransactionUUID: uuid, // [Required] the orginal trnasaction uuid that you want to reverse
  //       transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
  //       customerReferenceNumber: 'rerretest123333333', //[Optional]
  //       enableReceiptUi: true, // [Optional] show the reciept in ui
  //       enableReversalUi: true, //[Optional] enable reversal of transaction from ui
  //       editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
  //       finishTimeout: timeout, //[Optional] finish timeout in seconds
  //       enableUiDismiss: true, //[Optional] the ui is dimissible
  //       adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= refund success =-=-=-=`);
  //       console.log(`refund respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= refund failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // function doReverse(uuid: string) {
  //   console.log(`=-=-=-= reverse start =-=-=-=`);
  //   embededNearpay
  //     .current!.reverse({
  //       originalTransactionUUID: uuid, // [Required] the orginal trnasaction uuid that you want to reverse
  //       enableReceiptUi: true, // [Optional] show the reciept in ui
  //       finishTimeout: timeout, //[Optional] finish timeout in seconds
  //       enableUiDismiss: true, //[Optional] the ui is dimissible
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= reverse success =-=-=-=`);
  //       console.log(`reverse respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= reverse failed =-=-=-=`);
  //       console.log(`error:`);
  //       console.log(JSON.stringify(e, null, 2));
  //       throw e;
  //     });
  // }

  function doReconcile() {
    console.log(`=-=-=-= reconcile start =-=-=-=`);
    embededNearpay.current!.reconcile({
      enableReceiptUi: true, // [Optional] show the reciept in ui
      finishTimeout: timeout, //[Optional] finish timeout in seconds
      enableUiDismiss: true, //[Optional] the ui is dimissible
      adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
      onReconcileSuccess: (reciepts) => {
        console.log(`=-=-=-= reconcile success =-=-=-=`);
        console.log(`reconcile respone: `, reciepts);
      },
      onReconcileFailed: (err) => {
        console.log(`=-=-=-= reconcile failed =-=-=-=`);
      },
    });
  }

  async function doPurchaseAndRefund() {
    console.log(`=-=-=-= purchse then refund start =-=-=-=`);
    await embededNearpay.current!.purchase({
      amount: 1000,
      onPurchaseSuccess: (receipts) => {
        console.log(`=-=-=-= Purcahse success =-=-=-=`);
        console.log({
          purchseReceipts: receipts,
        });
        const uuid = receipts[0]?.transaction_uuid!;
        embededNearpay.current!.refund({
          amount: 1000,
          originalTransactionUUID: uuid,
          transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
          customerReferenceNumber: 'rerretest123333333', //[Optional]
          enableReceiptUi: true, // [Optional] show the reciept in ui
          enableReversalUi: true, //[Optional] enable reversal of transaction from ui
          editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
          finishTimeout: timeout, //[Optional] finish timeout in seconds
          enableUiDismiss: true, //[Optional] the ui is dimissible
          adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.

          onRefundSuccess: (receitps) => {
            console.log(`=-=-=-= Refund success =-=-=-=`);
            console.log({
              refundReceipts: receipts,
            });
          },
          onRefundFailed: (err) => {
            console.log(`=-=-=-= Refund failed =-=-=-=`);
          },
        });
      },
      onPurchaseFailed: (err) => {
        console.log(`=-=-=-= Purcahse failed =-=-=-=`);
      },
    });
  }

  async function doPurchaseAndReverse() {
    console.log(`=-=-=-= purchse then reverse start =-=-=-=`);
    await embededNearpay.current!.purchase({
      amount: 1000,
      onPurchaseSuccess: (receipts) => {
        console.log(`=-=-=-= Purcahse success =-=-=-=`);
        console.log({
          purchseReceipts: receipts,
        });
        const uuid = receipts[0]?.transaction_uuid!;
        embededNearpay.current!.reverse({
          originalTransactionUUID: uuid,
          enableReceiptUi: true, // [Optional] show the reciept in ui
          finishTimeout: timeout, //[Optional] finish timeout in seconds
          enableUiDismiss: true, //[Optional] the ui is dimissible
          onReverseSuccess: (receitps) => {
            console.log(`=-=-=-= Reverse success =-=-=-=`);
            console.log({
              ReverseReceipts: receipts,
            });
          },
          onReverseFailed: (err) => {
            console.log(`=-=-=-= Reverse failed =-=-=-=`);
          },
        });
      },
      onPurchaseFailed: (err) => {
        console.log(`=-=-=-= Purcahse failed =-=-=-=`);
      },
    });
  }

  function doLogout() {
    console.log(`=-=-=-= logout start =-=-=-=`);
    embededNearpay
      .current!.logout()
      .then((response) => {
        console.log(`=-=-=-= logout success =-=-=-=`);
        console.log(`logout respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= logout failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  function doSetupClick() {
    console.log(`=-=-=-= setup start =-=-=-=`);
    embededNearpay
      .current!.setup()
      .then((response) => {
        console.log(`=-=-=-= setup success =-=-=-=`);
        console.log(`setup respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= setup failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  function doSession() {
    console.log(`=-=-=-= session start =-=-=-=`);
    embededNearpay
      .current!.session({
        sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        finishTimeout: timeout, //[Optional] finish timeout in seconds
        enableUiDismiss: true, //[Optional] the ui is dimissible
      })
      .then((response) => {
        console.log(`=-=-=-= session success =-=-=-=`);
        console.log(`session respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= session failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  return (
    <View style={styles.container}>
      {isAndroid && (
        <>
          <View style={styles.containerrow}>
            <Button title="Purchase" onPress={() => doPurchase(100)} />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="Purchase and Refund "
              onPress={() => doPurchaseAndRefund()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="Purchase and Reverse "
              onPress={() => doPurchaseAndReverse()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button title="Reconcile" onPress={() => doReconcile()} />
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
        </>
      )}

      {!isAndroid && (
        <View style={styles.containerrow}>
          <Text>not supported</Text>
        </View>
      )}
    </View>
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
