import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';

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
  const [gameOver, setGameOver] = useState(false);
  const countTry = useRef(0);
  const rdmNumber = useRef(null);

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

  const saveRdmNumber = (val) => {
    rdmNumber.current = val;
  };

  const incrementCountTry = (val) => {
    countTry.current = val;
  };

  const startGameHandler = () => {
    setStartGame(true);
  };

  const gameOverHandler = () => {
    console.log('game is over ...');
    setGameOver(true);
  };

  const goBack = () => {
    setStartGame(false);
  };

  let displayScreen = () => {
    if (gameOver) {
      return (
        <EndGameScreen
          countTry={countTry.current}
          rdmNumber={rdmNumber.current}
        />
      );
    } else if (startGame && !gameOver) {
      return (
        <GameScreen
          onGoBack={goBack}
          onGameOver={gameOverHandler}
          onTry={incrementCountTry}
          saveRdmNumber={saveRdmNumber}
        />
      );
    } else {
      return <StartGameScreen onStartGame={startGameHandler} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {displayScreen()}
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
