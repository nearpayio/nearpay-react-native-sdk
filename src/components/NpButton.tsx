import React from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';

type props = { onPress?: () => void } & React.ComponentProps<typeof View>;

export default function NpButton({ onPress, style, ...rest }: props) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={style} {...rest}></View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    padding: 7,
    textAlign: 'center',
  },
});
