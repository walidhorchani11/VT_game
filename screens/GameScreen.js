import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Input from '../components/Input';
import colors from '../constants/colors';

const generateNumber = () => {
  return Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
};

const GameScreen = (props) => {
  const rdmNumber = useRef(null);
  const [userNumberOne, setUserNumberOne] = useState();
  const [userNumberTwo, setUserNumberTwo] = useState();
  const [userNumberThree, setUserNumberThree] = useState();
  const [userNumberFor, setUserNumberFor] = useState();

  useEffect(() => {
    rdmNumber.current = generateNumber().toString().split('');

    console.log(' le type de ::::', rdmNumber.current);
  }, []);

  const validateInput = (val) => {
    return val.replace(/[^0-9]/g, '');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              setUserNumberOne(validateInput(val));
              console.log('one:', userNumberOne);
            }}
            value={userNumberOne}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              setUserNumberTwo(validateInput(val));
              console.log('two:', userNumberTwo);
            }}
            value={userNumberTwo}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              setUserNumberThree(validateInput(val));
              console.log('three:', userNumberThree);
            }}
            value={userNumberThree}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              setUserNumberFor(validateInput(val));
              console.log('for:', userNumberFor);
            }}
            value={userNumberFor}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color={colors.secondo} title="check" />
          </View>
          <View style={styles.button}>
            <Button color={colors.secondo} title="reset" />
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
