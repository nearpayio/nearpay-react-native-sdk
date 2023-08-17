import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import useEmbededSide from '../hooks/useEmbededSide';
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
} from '@nearpaydev/react-native-nearpay-sdk';

export default function EmbededSide() {
  const {
    doLogout,
    doPurchase,
    doPurchaseAndRefund,
    doPurchaseAndReverse,
    doReconcile,
    doSession,
    doSetupClick,
    doUpdateAuthentication,
    getReconciliation,
    getReconciliations,
    getTransaction,
    getTransactions,
    doReceiptToImage,
    isAndroid,
    embededNearpay,
    base64Image,
  } = useEmbededSide();

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
          <View style={styles.containerrow}>
            <Button
              title="update auth "
              onPress={() => doUpdateAuthentication()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="get transaction by UUID"
              onPress={() => getTransaction()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="get transactions"
              onPress={() => getTransactions()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="get Reconciliation by UUID"
              onPress={() => getReconciliation()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="get Reconciliations"
              onPress={() => getReconciliations()}
            />
          </View>
          <View style={styles.containerrow}>
            <Button
              title="receipt to image"
              onPress={() => doReceiptToImage()}
            />
          </View>
          <View
            style={{
              height: 1000,
            }}
          >
            {base64Image === undefined && <Text>No Image</Text>}
            {base64Image !== undefined && (
              <>
                <Image
                  style={{
                    width: 400,
                    height: 1000,
                  }}
                  source={{ uri: `data:image/jpeg;base64, ${base64Image}` }}
                />
                {/* <View>
                  <Text>{`data:image/jpeg;base64, ${base64Image}`}</Text>
                </View> */}
              </>
            )}
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
