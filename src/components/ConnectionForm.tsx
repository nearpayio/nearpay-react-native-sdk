import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native';

type props = {
  onSubmit: () => void;
  onChangeIp: React.Dispatch<React.SetStateAction<string>>;
  onChangePort: React.Dispatch<React.SetStateAction<string>>;
};

export default function ConnectionForm({
  onSubmit,
  onChangeIp,
  onChangePort,
}: props) {
  return (
    <View style={styles.form_container}>
      <TextInput
        onSubmitEditing={() => onSubmit()}
        onChangeText={onChangeIp}
        keyboardType="number-pad"
        placeholder="Ip address"
        style={styles.input}
      />
      <TextInput
        onSubmitEditing={() => onSubmit()}
        onChangeText={onChangePort}
        keyboardType="number-pad"
        placeholder="Port"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
