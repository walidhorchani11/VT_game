import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Input from '../components/Input';
import colors from '../constants/colors';

const MAX_LENGTH_NUMBER = 4;

const generateNumber = () => {
  return Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
};

const formatNumberToArray = (number) => {
  let arrayNumber = number.toString().split('');
  const toAdd = MAX_LENGTH_NUMBER - arrayNumber.length;
  for (let i = 0; i < toAdd; i++) {
    arrayNumber.unshift('0');
  }

  return arrayNumber;
};

const validateInput = (val) => {
  return val.replace(/[^0-9]/g, '');
};

const controlUserGuess = (userGuess, randomNumber) => {
  let ind = ['', '', '', ''];
  // fixer bug si un num avc indicator V et son occurence est 1 seule fois & il est deja en "T" alors on met un "x" sauf si il existe en dautre place...a bien verifier en tous cas
  userGuess.forEach((numGuessed, index) => {
    randomNumber.forEach((numGenerated, i) => {
      if (numGuessed === numGenerated) {
        if (index === i) {
          ind[index] = ind[index].concat('T');
        } else {
          ind[index] = ind[index].concat('V');
        }
      }
    });
  });
  console.log('resultat indicator is:::', ind);

  return ind;
};

const GameScreen = (props) => {
  const rdmNumber = useRef(null);
  const [userNumber, setUserNumber] = useState(['', '', '', '']);
  const [checked, setChecked] = useState(false);
  const [resIndicator, setResIndicator] = useState(['', '', '', '']);
  const inputsRef = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  useEffect(() => {
    rdmNumber.current = formatNumberToArray(generateNumber());
    console.log('nombre generer finale est ::::', rdmNumber.current);
  }, []);

  useEffect(() => {
    let count = 0;
    userNumber.map((elem) => {
      if (elem.length > 0) {
        count++;
      }
    });
    if (count == 4) {
      Keyboard.dismiss();
    }
  }, [userNumber]);

  const changeTextHandler = (val, indice) => {
    if (val.length == 1 && indice !== MAX_LENGTH_NUMBER - 1) {
      inputsRef.current[indice + 1].current.focus();
    }
    let copyUserNumber = [...userNumber];
    copyUserNumber[indice] = validateInput(val);
    setUserNumber(copyUserNumber);
    setChecked(false);
  };

  const resetHandler = () => {
    setUserNumber(['', '', '', '']);
  };

  const checkUserNumber = () => {
    if (userNumber.indexOf('') !== -1) {
      Alert.alert('check number', 'renseigner tous les champs', [
        {
          text: 'okizz',
          style: 'destructive',
          onPress: () => {
            setChecked(true);
          },
        },
      ]);
      return;
    }

    return controlUserGuess(userNumber, rdmNumber.current);
  };

  const displayInput = (indice) => {
    return (
      <Input
        style={styles.inputText}
        onChangeText={(val) => {
          changeTextHandler(val, indice);
        }}
        value={userNumber[indice]}
        checked={checked}
        ref={inputsRef.current[indice]}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          {displayInput(0)}
          {displayInput(1)}
          {displayInput(2)}
          {displayInput(3)}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              color={colors.secondo}
              title="check"
              onPress={checkUserNumber}
            />
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
