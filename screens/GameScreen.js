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

const validateInput = (val) => {
  return val.replace(/[^0-9]/g, '');
};

const GameScreen = (props) => {
  const rdmNumber = useRef(null);
  const [userNumber, setUserNumber] = useState(['', '', '', '']);

  useEffect(() => {
    rdmNumber.current = generateNumber().toString().split('');

    console.log(' le type de ::::', rdmNumber.current);
  }, []);

  const changeTextHandler = (val, indice) => {
    let copyUserNumber = [...userNumber];
    copyUserNumber[indice] = validateInput(val);
    setUserNumber(copyUserNumber);

    console.log('UserNumber after change', userNumber);
  };

  const resetHandler = () => {
    setUserNumber(['', '', '', '']);
  };

  const checkUserNumber = () => {
    userNumber;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              changeTextHandler(val, 0);
            }}
            value={userNumber[0]}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              changeTextHandler(val, 1);
            }}
            value={userNumber[1]}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              changeTextHandler(val, 2);
            }}
            value={userNumber[2]}
          />
          <Input
            style={styles.inputText}
            onChangeText={(val) => {
              changeTextHandler(val, 3);
            }}
            value={userNumber[3]}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color={colors.secondo} title="check" />
          </View>
          <View style={styles.button}>
            <Button
              color={colors.secondo}
              title="reset"
              onPress={resetHandler}
            />
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
