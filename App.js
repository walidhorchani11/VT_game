import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const fetchFonts = () => {
  console.log('on fetch font ....');
  return Font.loadAsync({
    'Fondamento-italic': require('./assets/fonts/Fondamento-Italic.ttf'),
    'Fondamento-regular': require('./assets/fonts/Fondamento-Regular.ttf'),
  });
};

export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsLoaded(true)}
        onError={(error) => {
          console.log('there is an error', error);
        }}
      />
    );
  }

  const startGameHandler = () => {
    setStartGame(true);
  };

  const goBack = () => {
    setStartGame(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      {startGame ? (
        <GameScreen onGoBack={goBack} />
      ) : (
        <StartGameScreen onStartGame={startGameHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
