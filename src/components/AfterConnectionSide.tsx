import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NpButton from './NpButton';
import { useNearpay } from '../context/NearpayContext';
import { CONNECTION_STATE } from '@nearpaydev/nearpay-ts-sdk';

export default function AfterConnectionSide() {
  const { nearpay, connectionState } = useNearpay();

  const stateStyle =
    connectionState === CONNECTION_STATE.CONNECTED
      ? styles.state
      : styles.err_state;

  return (
    <View style={styles.container}>
      <Text style={stateStyle}>{connectionState}</Text>
      <NpButton style={styles.btn} onPress={() => nearpay.disconnectDevice()}>
        <Text>Disconnect</Text>
      </NpButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  state: {
    color: 'green',
  },
  err_state: {
    color: 'orange',
  },

  btn: {
    // height: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,0,0,0.5)',
    color: 'white',
  },
});
