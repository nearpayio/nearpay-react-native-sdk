import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ConnectionForm from './ConnectionForm';
import { useNearpay } from '../context/NearpayContext';
import { CONNECTION_STATE, NEARPAY_CONNECTOR } from 'test-nearpay-sdk-ramadan';
import NpButton from './NpButton';
import { block } from 'react-native-reanimated';

export default function ConnectionSide() {
  const [ip, setIp] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const { nearpay, close, connectionState } = useNearpay();
  const [loading, setLoading] = useState(false);

  function onSubmit() {
    setLoading(true);
    nearpay
      .connect({
        type: NEARPAY_CONNECTOR.WS,
        ip,
        port,
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <View style={styles.main_content}>
        <Text style={styles.hint_text}>
          Please enter the ip address and the port shown in the POS device
        </Text>
        <ConnectionForm
          onChangeIp={setIp}
          onChangePort={setPort}
          onSubmit={onSubmit}
        />
      </View>
      <View>
        <NpButton onPress={() => onSubmit()} style={styles.connect_button}>
          {connectionState === CONNECTION_STATE.CONNECTING && (
            <ActivityIndicator color={'white'} size={'small'} />
          )}

          {connectionState !== CONNECTION_STATE.CONNECTING && (
            <Text style={{ color: 'white' }}>Connect</Text>
          )}
        </NpButton>
        {/* <Button color={'black'} title="Connect" onPress={() => onSubmit()} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hint_text: {
    fontSize: 12,
    marginBottom: 15,
  },

  main_content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },

  connect_button: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
});
