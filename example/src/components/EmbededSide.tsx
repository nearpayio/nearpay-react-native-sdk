import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useEmbededSide from '../hooks/useEmbededSide';

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
    isAndroid,
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
