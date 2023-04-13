import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import ProxySide from './components/ProxySide';
import EmbededSide from './components/EmbededSide';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  // function showToast(type: any, title: any, message: any) {
  //   Toast.show({
  //     type: type,
  //     text1: title,
  //     text2: message,
  //   });
  // }

  // async function doPurchase(amount: number) {
  //   console.log(`=-=-=-= purchse start =-=-=-=`);
  //   return embededNearpay
  //     .purchase({
  //       amount: amount, // Required
  //       customerReferenceNumber: 'uuyuyuyuy65565675', // Optional
  //       enableReceiptUi: true, //Optional
  //       enableReversal: true, //it will allow you to enable or disable the reverse button
  //       finishTimeout: timeout, //Optional
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= purchse success =-=-=-=`);
  //       console.log(`purchse respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= purchse failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // function doRefund(amount: number, uuid: string) {
  //   console.log(`=-=-=-= refund start =-=-=-=`);
  //   embededNearpay
  //     .refund({
  //       amount: amount, // [Required]
  //       transactionUUID: uuid, // [Required]
  //       customerReferenceNumber: 'rerretest123333333', //[Optional]
  //       enableReceiptUi: true, // [Optional]
  //       enableReversal: true, // [Optional]
  //       editableReversalUI: true, // [Optional]
  //       finishTimeout: timeout, // [Optional]
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
  //     .reverse({
  //       transactionUUID: uuid, // Required
  //       enableReceiptUi: true, // Optional
  //       finishTimeout: timeout, // Optional
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= reverse success =-=-=-=`);
  //       console.log(`reverse respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= reverse failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // function doReconcile() {
  //   console.log(`=-=-=-= reconcile start =-=-=-=`);
  //   embededNearpay
  //     .reconcile({
  //       enableReceiptUi: true, // Optional
  //       finishTimeout: timeout, // Optional
  //       adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= reconcile success =-=-=-=`);
  //       console.log(`reconcile respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= reconcile failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // async function doPurchaseAndRefund() {
  //   console.log(`=-=-=-= purchse then refund start =-=-=-=`);
  //   await doPurchase(100)
  //     .then((response) => {
  //       var purchaseList = response.list;
  //       let uuid = purchaseList[0].transaction_uuid;
  //       doRefund(100, uuid);
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= purchse then refund failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //     });
  // }

  // async function doPurchaseAndReverse() {
  //   console.log(`=-=-=-= purchse then reverse start =-=-=-=`);
  //   await doPurchase(100)
  //     .then((response) => {
  //       var purchaseList = response.list;
  //       let uuid = purchaseList[0].transaction_uuid;
  //       doReverse(uuid);
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= purchse then reverse failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //     });
  // }

  // function doLogout() {
  //   console.log(`=-=-=-= logout start =-=-=-=`);
  //   embededNearpay
  //     .logout()
  //     .then((response) => {
  //       console.log(`=-=-=-= logout success =-=-=-=`);
  //       console.log(`logout respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= logout failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // function doSetupClick() {
  //   console.log(`=-=-=-= setup start =-=-=-=`);
  //   embededNearpay
  //     .setup()
  //     .then((response) => {
  //       console.log(`=-=-=-= setup success =-=-=-=`);
  //       console.log(`setup respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= setup failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  // function doSession() {
  //   console.log(`=-=-=-= session start =-=-=-=`);
  //   embededNearpay
  //     .session({
  //       sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
  //       enableReceiptUi: true, //Optional
  //       enableReversal: true,
  //       finishTimeout: timeout, // Optional
  //     })
  //     .then((response) => {
  //       console.log(`=-=-=-= session success =-=-=-=`);
  //       console.log(`session respone: ${response}`);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.log(`=-=-=-= session failed =-=-=-=`);
  //       console.log(`error: ${e}`);
  //       throw e;
  //     });
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome to Nearpay SDK' }}
        />
        <Stack.Screen
          name="Embeded"
          component={EmbededSide}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Proxy" component={ProxySide} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <View style={styles.container}>
  //     <EmbededSide />
  //     {/* Proxy side */}
  //     <View style={styles.hr}></View>
  //     <NearpayProvider nearpay={remoteNearpay}>
  //       <ProxySide />
  //     </NearpayProvider>
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   containerrow: {
//     flexDirection: 'row',
//     //marginBottom : 10,
//     marginBottom: '5%',
//   },
//   buttonContainer: {
//     flex: 1,
//   },
//   hr: {
//     height: 10,
//     width: '70%',
//     backgroundColor: 'black',
//   },
// });
