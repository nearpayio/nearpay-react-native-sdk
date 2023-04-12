import React from 'react';
import { Text } from 'react-native';

type props = {
  value: string;
};

export default function Comp({ value }: props) {
  return <Text>value is {value}</Text>;
}
