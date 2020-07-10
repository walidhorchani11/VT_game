import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import colors from '../constants/colors';

const StartGameScreen = () => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button title="Start" color={colors.secondo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    marginVertical: 20,
  },
});

export default StartGameScreen;
