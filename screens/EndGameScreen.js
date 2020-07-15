import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EndGameSceen = (props) => {
  return (
    <View>
      <Text>game over....::: {props.countTry}</Text>
      <Text>number issss....::: {props.rdmNumber}</Text>
    </View>
  );
};

export default EndGameSceen;
