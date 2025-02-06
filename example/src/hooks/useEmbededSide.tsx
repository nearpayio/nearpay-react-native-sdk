import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
  PurchaseAuthenticationFailed,
  PurchaseDeclined,
  PurchaseGeneralFailure,
  PurchaseInvalidStatus,
  PurchaseRejected,
  QueryAuthenticationFailed,
  QueryFailureMessage,
  QueryGeneralFailure,
  QueryInvalidStatus,
  ReconcileAuthenticationFailed,
  ReconcileFailureMessage,
  ReconcileGeneralFailure,
  ReconcileInvalidStatus,
  RefundAuthenticationFailed,
  RefundDeclined,
  RefundGeneralFailure,
  RefundInvalidStatus,
  RefundRejected,
  ReversalAuthenticationFailed,
  ReversalFailureMessage,
  ReversalGeneralFailure,
  ReversalInvalidStatus,
} from '@nearpaydev/react-native-nearpay-sdk';
global.Buffer = require('buffer').Buffer;

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
// import {
//   PurchaseGeneralFailure,
//   PurchaseInvalidStatus,
//   PurchaseRejected,
// } from '../../../src/libs/errors/purchase_error/purchase_error';

let authtype = AuthenticationType.email;
let authvalue = 'a.khalifa@nearpay.io';
let environment = Environments.sandbox;
//Time out n seconds
let timeout = 60;
const isAndroid = Platform.select({ android: true });

export default function useEmbededSide() {
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  var globalTransactionID = '';
  const embededNearpay = useRef(
    Platform.select({ android: true })
      ? new EmbededNearpay({
          authtype,
          authvalue,
          environment,
        })
      : undefined
  );

  async function doInitilize() {
    authvalue = 'a.saeed@nearpay.io';
    embededNearpay.current?.initialize({ authtype, authvalue, environment });
  }

  async function doPurchase(amount: number) {
    const transactionID = uuidv4();
    globalTransactionID = transactionID as string;
    return await embededNearpay
      .current!.purchase({
        amount: amount, // Required
        transactionId: transactionID, //[Optional] speacify the transaction uuid
        customerReferenceNumber: 'abc', // [Optional] referance nuber for customer use only
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
        if (e instanceof PurchaseDeclined) {
          // when the payment declined.
        } else if (e instanceof PurchaseRejected) {
          // Handle purchase rejected
        } else if (e instanceof PurchaseGeneralFailure) {
          // Handle general failure
        } else if (e instanceof PurchaseInvalidStatus) {
          // Handle invalid status
        } else if (e instanceof PurchaseAuthenticationFailed) {
          // when the authentication failed .
        }
        throw e;
      });
  }

  async function doRefund(amount: number, uuid: string) {
    console.log(`=-=-=-= refund start =-=-=-=`);
    embededNearpay
      .current!.refund({
        amount: amount, // [Required]
        originalTransactionUUID: uuid, // [Required] the orginal trnasaction uuid that you want to reverse
        transactionId: uuidv4(), //[Optional] speacify the transaction uuid
        customerReferenceNumber: 'rerretest123333333', //[Optional]
        enableReceiptUi: true, // [Optional] show the reciept in ui
        enableReversalUi: true, //[Optional] enable reversal of transaction from ui
        editableRefundAmountUI: true, // [Optional] edit the reversal amount from uid
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
        if (e instanceof RefundAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof RefundGeneralFailure) {
          // Handle general failure
        } else if (e instanceof RefundInvalidStatus) {
          // Handle invalid status
        } else if (e instanceof RefundDeclined) {
          // when the refund is declined.
        } else if (e instanceof RefundRejected) {
          // when the refund is rejected
        }
        throw e;
      });
  }

  async function doReverse(uuid: string) {
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
        if (e instanceof ReversalAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof ReversalGeneralFailure) {
          // Handle general failure
        } else if (e instanceof ReversalFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof ReversalInvalidStatus) {
          // Handle invalid status
        }
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
        if (e instanceof ReconcileAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof ReconcileGeneralFailure) {
          // Handle general failure
        } else if (e instanceof ReconcileFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof ReconcileInvalidStatus) {
          // Handle invalid status
        }
        throw e;
      });
  }

  async function doPurchaseAndRefund() {
    console.log(`=-=-=-= purchse then refund start =-=-=-=`);
    const transactionData = await doPurchase(100).catch((e) => {
      console.log(`=-=-=-= purchse then refund failed =-=-=-=`);
      throw e;
    });

    let uuid = transactionData.receipts![0]?.transaction_uuid!;
    const refundData = await doRefund(100, uuid);

    console.log({ refundData });
  }

  async function doPurchaseAndReverse() {
    console.log(`=-=-=-= purchse then reverse start =-=-=-=`);
    const transactionData = await doPurchase(100).catch((e) => {
      console.log(`=-=-=-= purchse then reverse failed =-=-=-=`);
      throw e;
    });

    let uuid = transactionData.receipts![0]?.transaction_uuid!;
    const reverseData = await doReverse(uuid);

    console.log({ reverseData });
  }

  async function doPurchaseAndCancel() {
    console.log(`=-=-=-= purchse then cancel start =-=-=-=`);
    doPurchase(100);
    cancel();
  }
  async function cancel() {
    const cancelResponse = await requestCancel(globalTransactionID);
    console.log({ cancelResponse });
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

  function doClose() {
    console.log(`=-=-=-= close start =-=-=-=`);
    embededNearpay.current!.close();
  }

  async function doSession() {
    console.log(`=-=-=-= session start =-=-=-=`);

    const terminal_id = '12a8abeb-cdf6-4432-a287-2d3a54bc7b88';

    const api_key =
      'A221mIWc0ldmrmqkAM3kSITN3i58smLvhpBAP0pOyXxc9mDxphrkqmBKt4HL';

    const url = `https://sandbox-api.nearpay.io/v1/clients-sdk/terminals/${terminal_id}/sessions`;

    const res = await axios(url, {
      method: 'post',
      headers: {
        'api-key': `${api_key}`,
      },
      data: {
        type: 'purchase',
        amount: 400,
      },
      // body: JSON.stringify({
      //   type: 'purchase',
      //   amount: 40,
      // }),
    })
      .then((res) => {
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
        console.log({ response });

        return response;
      })
      .catch((e) => {
        console.log(`=-=-=-= session failed =-=-=-=`);
        console.log({ e });
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
    const from = new Date(Date.UTC(2023, 7, 10));
    const to = new Date(Date.now());

    embededNearpay.current
      ?.getTransactionsList({
        page: 1,
        limit: 40,
        startDate: from,
        endDate: to,
        // customerReferenceNumber: 'abc',
        isReconciled: true
      })
      .then((res) => {
        console.log(`=-=-=-= get transactions success =-=-=-=`);
        console.log(res);
      })
      .catch((e) => {
        if (e instanceof QueryAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof QueryGeneralFailure) {
          // Handle general failure
        } else if (e instanceof QueryFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof QueryInvalidStatus) {
          // Handle invalid status
        }
      });
  }

  function getTransaction() {
    return embededNearpay.current
      ?.getTransaction({
        transactionUUID: '94cd7017-ff71-410f-a4e8-31803c042dec',
        enableReceiptUi: true,
        finishTimeOut: 10,
      })
      .then((res) => {
        console.log(`=-=-=-= get transaction success =-=-=-=`);
        console.log(res);
      })
      .catch((e) => {
        if (e instanceof QueryAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof QueryGeneralFailure) {
          // Handle general failure
        } else if (e instanceof QueryFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof QueryInvalidStatus) {
          // Handle invalid status
        }
      });
  }

  function getReconciliations() {
    const from = new Date(Date.UTC(2023, 7, 10));
    const to = new Date(Date.now());

    return embededNearpay.current
      ?.getReconciliationsList({
        page: 1,
        limit: 20,
        startDate: from,
        endDate: to,
      })
      .then((res) => {
        console.log(`=-=-=-= get Reconciliations success =-=-=-=`);
        console.log(res);
      })
      .catch((e) => {
        if (e instanceof QueryAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof QueryGeneralFailure) {
          // Handle general failure
        } else if (e instanceof QueryFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof QueryInvalidStatus) {
          // Handle invalid status
        }
      });
  }

  function getReconciliation() {
    return embededNearpay.current
      ?.getReconciliation({
        reconciliationUUID: 'fda8153a-2f93-4327-b6c0-4ac9e4e933c2',
        enableReceiptUi: true,
        finishTimeOut: 10,
      })
      .then((res) => {
        console.log(`=-=-=-= get Reconciliation success =-=-=-=`);
        console.log(res);
      })
      .catch((e) => {
        if (e instanceof QueryAuthenticationFailed) {
          // when the authentication failed .
        } else if (e instanceof QueryGeneralFailure) {
          // Handle general failure
        } else if (e instanceof QueryFailureMessage) {
          // when there is FailureMessage
        } else if (e instanceof QueryInvalidStatus) {
          // Handle invalid status
        }
      });
  }

  function getUserSession() {
    return embededNearpay.current?.getUserSession({
      onSessionBusy: (e) => console.log('onSessionBusy', e),
      onSessionFailed: (e) => console.log('onSessionFailed', e),
      onSessionFree: () => console.log('onSessionFree'),
      onSessionInfo: (e) => console.log('onSessionInfo', e),
    });
  }

  async function doReceiptToImage() {
    const transactionData = await embededNearpay.current?.purchase({
      amount: 1200,
    });

    if (!transactionData) throw new Error('no receipt found');

    const bytes = await embededNearpay.current?.receiptToImage({
      receipt: transactionData?.receipts![0]!,
      receiptFontSize: 1,
      receiptWidth: 1000,
    })!;

    setBase64Image(() => Buffer.from(bytes).toString('base64'));
  }

  function requestCancel(uuid: string) {
    const cancelWithReverse = true;
    console.log(`=-=-=-= Request cancel with reverse start =-=-=-=`);
    return embededNearpay.current
      ?.requestCancel({
        transactionId: uuid,
        cancelWithReverse: cancelWithReverse,
      })
      .then((res) => {
        console.log(`=-=-=-= Request cancel with reverse success =-=-=-=`);
      })
      .catch((error) => {
        console.log(`=-=-=-= Request cancel with reverse failure =-=-=-=`);
      });
  }
  return {
    embededNearpay,
    isAndroid,
    base64Image,
    doInitilize,
    doClose,
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
    doReceiptToImage,
    doPurchaseAndCancel,
    getUserSession,
  };
}
