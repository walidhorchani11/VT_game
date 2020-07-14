import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import colors from '../constants/colors';
import IndicatorContainer from '../components/IndicatorContainer';
import defaults_styles from '../constants/defaults_styles';

const StartGameScreen = (props) => {
  return (
    <View style={defaults_styles.screen}>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>T</Text>
        </IndicatorContainer>
        <Text style={defaults_styles.text}>Numero dans sa place exacte</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>V</Text>
        </IndicatorContainer>

        <Text style={defaults_styles.text}>
          Numero existe mais pas dans sa place exacte
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <IndicatorContainer style={styles.indicator}>
          <Text>X</Text>
        </IndicatorContainer>
        <Text style={defaults_styles.text}>Numero n'existe pas</Text>
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
});

export default StartGameScreen;
