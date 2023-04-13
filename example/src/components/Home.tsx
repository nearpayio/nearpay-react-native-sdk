import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          title="Embeded (Android only)"
          onPress={() => {
            navigation.navigate('Embeded', { name: 'Jane' });
          }}
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Proxy"
          onPress={() => {
            navigation.navigate('Proxy', { name: 'Jane' });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    marginVertical: 30,
  },
});
