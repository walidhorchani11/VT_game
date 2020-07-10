import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import colors from '../constants/colors';

const Input = (props) => {
  return (
    <TextInput
      {...props}
      keyboardType={props.keyboardType}
      placeholder="?"
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primo,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});

Input.defaultProps = {
  keyboardType: 'numeric',
  maxLength: 1,
};

export default Input;
