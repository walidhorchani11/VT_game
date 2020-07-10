import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import colors from '../constants/colors';
import IndicatorContainer from '../components/IndicatorContainer';

const StartGameScreen = () => {
  return (
    <View style={styles.screen}>
      <IndicatorContainer style={styles.indicator}>
        <Text>T</Text>
      </IndicatorContainer>
      <IndicatorContainer style={styles.indicator}>
        <Text>V</Text>
      </IndicatorContainer>
      <IndicatorContainer style={styles.indicator}>
        <Text>X</Text>
      </IndicatorContainer>
      <View style={styles.buttonContainer}>
        <Button title="Start" color={colors.secondo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: 100,
    marginVertical: 20,
  },
  indicator: {
    width: 40,
    height: 40,
  },
});

export default StartGameScreen;
