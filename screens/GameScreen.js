import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Input from '../components/Input';

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Input style={styles.inputText} />
          <Input style={styles.inputText} />
          <Input style={styles.inputText} />
          <Input style={styles.inputText} />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="check" onPress={props.onGoBack} />
          </View>
          <View style={styles.button}>
            <Button title="reset" onPress={props.onGoBack} />
          </View>
        </View>

        <Button title="retour" onPress={props.onGoBack} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  inputText: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: 100,
  },
});

export default GameScreen;
