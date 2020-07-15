import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
} from 'react-native';

import Input from '../components/Input';
import colors from '../constants/colors';
import IndicatorContainer from '../components/IndicatorContainer';
import defaults_styles from '../constants/defaults_styles';

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
  const countTry = useRef(0);
  const [checked, setChecked] = useState(false);
  const [userNumber, setUserNumber] = useState(['', '', '', '']);
  const [resIndicator, setResIndicator] = useState(['', '', '', '']);
  const inputsRef = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  useEffect(() => {
    const nbr = generateNumber();
    rdmNumber.current = formatNumberToArray(nbr);
    console.log('nombre generer finale est ::::', rdmNumber.current);
    props.saveRdmNumber(nbr);
  }, []);

  /**
   * hide keyboard if all inputs are filled
   */
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

  /**
   * if user guesse the masked number, set state gameOver to true for navigate to EndGameScreen
   *
   * @param {array} userNumber number entered per user
   * @param {array} rdmNumber number generate per application
   */
  const launchGameOver = (userNumber, rdmNumber) => {
    const x = parseInt(userNumber.join(''));
    const y = parseInt(rdmNumber.join(''));
    if (x === y) {
      props.onGameOver();
    }
  };

  const incrementCountTry = () => {
    countTry.current = countTry.current + 1;
    props.onTry(countTry.current);
    console.log('tentiativeeeee:::', countTry.current);
  };

  /**
   * alert user if some input are empty
   */
  const validateUserNumber = (userNumber) => {
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
  };

  const checkUserNumber = () => {
    validateUserNumber(userNumber);
    incrementCountTry();
    launchGameOver(userNumber, rdmNumber.current);
    setResIndicator(controlUserGuess(userNumber, rdmNumber.current));
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
      <View style={defaults_styles.screen}>
        <View style={styles.inputContainer}>
          {displayInput(0)}
          {displayInput(1)}
          {displayInput(2)}
          {displayInput(3)}
        </View>

        <View style={styles.inputContainer}>
          <IndicatorContainer>
            <Text>{resIndicator[0]}</Text>
          </IndicatorContainer>
          <IndicatorContainer>
            <Text>{resIndicator[1]}</Text>
          </IndicatorContainer>
          <IndicatorContainer>
            <Text>{resIndicator[2]}</Text>
          </IndicatorContainer>
          <IndicatorContainer>
            <Text>{resIndicator[3]}</Text>
          </IndicatorContainer>
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
