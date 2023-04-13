import React from 'react';
import { TouchableHighlight, View } from 'react-native';

type props = { onPress?: () => void } & React.ComponentProps<typeof View>;

export default function NpButton({ onPress, style, ...rest }: props) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={style} {...rest}></View>
    </TouchableHighlight>
  );
}
