import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const generateNumber = () => {
  return Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
};

const GameScreen = (props) => {
  const rdmNumber = useRef(null);

  useEffect(() => {
    rdmNumber.current = generateNumber().toString().split('');

    console.log(' le type de ::::', rdmNumber.current);
  }, []);

  return (
    <View>
      <Text>ON Game</Text>
      <Button title="retour" onPress={props.onGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GameScreen;
