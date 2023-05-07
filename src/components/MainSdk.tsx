import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CONNECTION_STATE } from '@nearpaydev/nearpay-ts-sdk';
import AfterConnectionSide from './AfterConnectionSide';
import ConnectionSide from './ConnectionSide';
import { useNearpay } from '../context/NearpayContext';

const map: Record<CONNECTION_STATE, () => JSX.Element> = {
  [CONNECTION_STATE.CONNECTED]: AfterConnectionSide,
  [CONNECTION_STATE.DISCONNECTED]: AfterConnectionSide,
  [CONNECTION_STATE.LOGGED_OUT]: ConnectionSide,
  [CONNECTION_STATE.CONNECTING]: ConnectionSide,
};

// type props ={}
export default function MainSdk() {
  const { connectionState } = useNearpay();
  // @ts-ignore
  const Elm = useMemo(() => map[connectionState], [connectionState]);

  return (
    <View style={styles.sdk}>
      <Text style={styles.title}>Nearpay Proxy</Text>

      <Elm />
    </View>
  );
}

const styles = StyleSheet.create({
  sdk: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    bottom: 0,
    width: '100%',
    // height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hint_text: {
    fontSize: 12,
    marginBottom: 15,
  },
  form_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  input: {
    height: 40,
    flex: 1,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  main_content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
});
