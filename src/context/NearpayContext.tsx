import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,

  // TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainSdk from '../components/MainSdk';
import type { RemoteNearPay } from '../libs/remote/remoteNearpay';
import type { CONNECTION_STATE } from '@nearpaydev/nearpay-ts-sdk';
// import BottomSheet from '@gorhom/bottom-sheet';

type props = {
  nearpay: RemoteNearPay;
  setup: () => void;
  close: () => void;
  showSdk: boolean;
  connectionState: CONNECTION_STATE;
};

const ctx = React.createContext({} as props);

export function useNearpay() {
  return useContext(ctx);
}

export default function NearpayProvider({
  children,
  nearpay,
}: {
  children: any;
  nearpay: RemoteNearPay;
}) {
  const [showSdk, setShowSdk] = useState(false);
  const [connectionState, setConnectionState] = useState<CONNECTION_STATE>(
    nearpay.getState()
  );

  useEffect(() => {
    const removers = [nearpay.addConnectivityListener(setConnectionState)];

    return () => removers.forEach((rem) => rem());
  }, [nearpay]);

  function setup() {
    setShowSdk(true);
  }

  function close() {
    setShowSdk(false);
  }

  const values: props = {
    nearpay,
    showSdk,
    connectionState,
    setup,
    close,
  };

  return (
    <ctx.Provider value={values}>
      <View style={styles.container}>
        {children}

        {showSdk && (
          <View style={styles.sdk_conatainer}>
            <TouchableOpacity
              onPress={() => setShowSdk(false)}
              style={styles.sdk_touchable_close}
            >
              <View></View>
            </TouchableOpacity>
            <MainSdk />
          </View>
        )}
      </View>
    </ctx.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  sdk_conatainer: {
    position: 'absolute',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(100,100,100,0.3)',
  },
  sdk_touchable_close: {
    flex: 1,
    width: '100%',
  },
});
