import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../constants/colors';

const Card = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.primo,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default Card;
