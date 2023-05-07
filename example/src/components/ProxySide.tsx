import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  CONNECTION_STATE,
  NEARPAY_CONNECTOR,
  NearpayProvider,
  RemoteNearPay,
  useNearpay,
} from 'react-native-nearpay-sdk';

const remoteNearpay: RemoteNearPay = new RemoteNearPay();
remoteNearpay.addAutoReconnect();
remoteNearpay.connectToLastUser();

export default function ProxySide() {
  return (
    <NearpayProvider nearpay={remoteNearpay}>
      <Wrapped />
    </NearpayProvider>
  );
}

function Wrapped() {
  const { nearpay, connectionState, setup } = useNearpay();

  return (
    <>
      <View style={styles.containerrow}>
        <Button title="show/hide" onPress={setup} />
        <Button title="disconnect" onPress={() => nearpay.disconnectDevice()} />
        <Button
          title="connect"
          onPress={() => {
            nearpay.connect({
              type: NEARPAY_CONNECTOR.WS,
              ip: '172.20.10.4',
              port: '8080',
            });
          }}
        />
        <Button
          title="pay"
          onPress={() => {
            nearpay.cancelJob();
            nearpay.getTerminal().purchase({
              amount: 100,
            });
          }}
        />
      </View>

      <View style={styles.containerrow}>
        <Text>connection state: {connectionState}</Text>
      </View>
      {connectionState === CONNECTION_STATE.CONNECTED && (
        <View style={styles.containerrow}></View>
      )}
    </>
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
