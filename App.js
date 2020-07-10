import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [startGame, setStartGame] = useState(false);

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
