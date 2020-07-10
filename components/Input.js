import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import colors from '../constants/colors';

const Input = (props) => {
  return (
    <TextInput
      {...props}
      keyboardType={props.keyboardType}
      placeholder="?"
      style={
        props.checked && props.value === ''
          ? [styles.input, styles.inputError, props.style]
          : [styles.input, props.style]
      }
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
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
    shadowColor: 'red',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
  },
});

Input.defaultProps = {
  keyboardType: 'numeric',
  maxLength: 1,
};

export default Input;
