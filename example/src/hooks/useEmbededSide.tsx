import { useRef } from 'react';
import { Platform } from 'react-native';
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
} from '@nearpaydev/react-native-nearpay-sdk';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
let authtype = AuthenticationType.email;
let authvalue = '<enter your email here>';
let environment = Environments.sandbox;
//Time out n seconds
let timeout = 60;
const isAndroid = Platform.select({ android: true });

export default function useEmbededSide() {
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
    return embededNearpay
      .current!.purchase({
        amount: amount, // Required
        transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
        customerReferenceNumber: '', // [Optional] referance nuber for customer use only
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: timeout, //[Optional] finish timeout in seconds
      })
      .then((response) => {
        console.log(`=-=-=-= purchse success =-=-=-=`);
        console.log(`purchse respone:`);
        console.log(JSON.stringify(response, null, 2));
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= purchse failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  function doRefund(amount: number, uuid: string) {
    console.log(`=-=-=-= refund start =-=-=-=`);
    embededNearpay
      .current!.refund({
        amount: amount, // [Required]
        originalTransactionUUID: uuid, // [Required] the orginal trnasaction uuid that you want to reverse
        transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
        customerReferenceNumber: 'rerretest123333333', //[Optional]
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: timeout, //[Optional] finish timeout in seconds
        adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        console.log(`=-=-=-= refund success =-=-=-=`);
        console.log(`refund respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= refund failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  function doReverse(uuid: string) {
    console.log(`=-=-=-= reverse start =-=-=-=`);
    embededNearpay
      .current!.reverse({
        originalTransactionUUID: uuid, // [Required] the orginal trnasaction uuid that you want to reverse
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: timeout, //[Optional] finish timeout in seconds
      })
      .then((response) => {
        console.log(`=-=-=-= reverse success =-=-=-=`);
        console.log(`reverse respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= reverse failed =-=-=-=`);
        console.log(`error:`);
        console.log(JSON.stringify(e, null, 2));
        throw e;
      });
  }

  function doReconcile() {
    console.log(`=-=-=-= reconcile start =-=-=-=`);
    embededNearpay
      .current!.reconcile({
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableUiDismiss: true, //[Optional] the ui is dimissible
        finishTimeout: timeout, //[Optional] finish timeout in seconds
        adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
      })
      .then((response) => {
        console.log(`=-=-=-= reconcile success =-=-=-=`);
        console.log(`reconcile respone: ${response}`);
        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= reconcile failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  async function doPurchaseAndRefund() {
    console.log(`=-=-=-= purchse then refund start =-=-=-=`);
    await doPurchase(100)
      .then((response) => {
        var purchaseList = response.receipts;
        let uuid = purchaseList[0].transaction_uuid;
        doRefund(100, uuid);
      })
      .catch((e) => {
        console.log(`=-=-=-= purchse then refund failed =-=-=-=`);
        console.log(`error: ${e}`);
      });
  }

  async function doPurchaseAndReverse() {
    console.log(`=-=-=-= purchse then reverse start =-=-=-=`);
    await doPurchase(100)
      .then((response) => {
        var purchaseList = response.receipts;
        let uuid = purchaseList[0].transaction_uuid;
        doReverse(uuid);
      })
      .catch((e) => {
        console.log(`=-=-=-= purchse then reverse failed =-=-=-=`);
        console.log(`error:`);
        console.log(JSON.stringify(e, null, 2));
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
        console.log(`error: `);
        console.log(e);
        throw e;
      });
  }

  async function doSession() {
    console.log(`=-=-=-= session start =-=-=-=`);

    axios(
      'https://sandbox-api.nearpay.io/v1/clients-sdk/terminals/{terminal_id}/sessions',
      {
        method: 'post',
        headers: {
          'api-key': '{your-api-key}',
        },
        data: {
          type: 'purchase',
          amount: 40,
        },
        // body: JSON.stringify({
        //   type: 'purchase',
        //   amount: 40,
        // }),
      }
    )
      .then((res) => {
        console.log({ res: res.data });

        return embededNearpay.current!.session({
          sessionID: res.data.id, // Required
          enableReceiptUi: true, // [Optional] show the reciept in ui
          enableReversalUi: true, //[Optional] enable reversal of transaction from ui
          finishTimeout: timeout, //[Optional] finish timeout in seconds
          enableUiDismiss: true, //[Optional] the ui is dimissible
        });
      })
      .then((response) => {
        console.log(`=-=-=-= session success =-=-=-=`);
        console.log(`session respone:`);
        console.log(response);

        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= session failed =-=-=-=`);
        console.log(`error: ${e}`);
        throw e;
      });
  }

  function doUpdateAuthentication() {
    embededNearpay.current?.updateAuthentication({
      authtype: AuthenticationType.email,
      authvalue: 'xx@test.com',
    });
  }

  function getTransactions() {
    embededNearpay.current
      ?.getTransactionsList({
        page: 1,
        limit: 20,
      })
      .then((res) => {
        console.log(`=-=-=-= get transactions success =-=-=-=`);
        console.log(res);
      });
  }

  function getTransaction() {
    return embededNearpay.current
      ?.getTransaction({
        transactionUUID: 'a2fd6519-2b37-4336-be6d-5520bb3b6427',
      })
      .then((res) => {
        console.log(`=-=-=-= get transaction success =-=-=-=`);
        console.log(res);
      });
  }

  function getReconciliations() {
    return embededNearpay.current
      ?.getReconciliationsList({
        page: 1,
        limit: 20,
      })
      .then((res) => {
        console.log(`=-=-=-= get Reconciliations success =-=-=-=`);
        console.log(res);
      });
  }

  function getReconciliation() {
    return embededNearpay.current
      ?.getReconciliation({
        reconciliationUUID: '6d4a48b8-d194-4aad-92c9-a77606758799',
      })
      .then((res) => {
        console.log(`=-=-=-= get Reconciliation success =-=-=-=`);
        console.log(res);
      });
  }

  return {
    embededNearpay,
    isAndroid,
    doLogout,
    doPurchase,
    doPurchaseAndRefund,
    doPurchaseAndReverse,
    doReconcile,
    doSession,
    doSetupClick,
    getTransactions,
    getTransaction,
    getReconciliations,
    getReconciliation,
    doUpdateAuthentication,
  };
}
