import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import defaults_styles from '../constants/defaults_styles';
import colors from '../constants/colors';

const EndGameSceen = (props) => {
  return (
    <View style={defaults_styles.screen}>
      <Text>game over....::: {props.countTry}</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.gif')} style={styles.image} />
      </View>
      <Text>number: {props.rdmNumber}</Text>
      <Text>nombre d'essaie: {props.rdmNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    height: 270,
    backgroundColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondo,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EndGameSceen;
