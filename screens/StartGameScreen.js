import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import colors from '../constants/colors';
import IndicatorContainer from '../components/IndicatorContainer';

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>T</Text>
        </IndicatorContainer>
        <Text style={styles.text}>Numero dans sa place exacte</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>V</Text>
        </IndicatorContainer>

        <Text style={styles.text}>
          Numero existe mais pas dans sa place exacte
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>X</Text>
        </IndicatorContainer>
        <Text style={styles.text}>Numero n'existe pas</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          color={colors.secondo}
          onPress={props.onStartGame}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    width: 100,
    marginVertical: 20,
  },
  indicator: {
    width: 40,
    height: 40,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    flex: 1,
    padding: 10,
    fontFamily: 'Fondamento-italic',
  },
});

export default StartGameScreen;
