import React, { useEffect, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
  ScrollView,
} from 'react-native';

import Input from '../components/Input';
import IndicatorContainer from '../components/IndicatorContainer';
import defaults_styles from '../constants/defaults_styles';
import MainButton from '../components/MainButton';
import Card from '../components/Card';

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
  const [guesses, setGuesses] = useState([]);
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
    props.updateHistories(userNumber);
    launchGameOver(userNumber, rdmNumber.current);
    setResIndicator(controlUserGuess(userNumber, rdmNumber.current));
    setGuesses((currentGuesses) => [userNumber, ...currentGuesses]);
    console.log('guesses:::', guesses);
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

  const renderGuesses = (guesse, indice) => {
    return (
      <Card style={styles.guesse} key={indice}>
        <Text># {indice} : </Text>
        <Text>{guesse}</Text>
      </Card>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[defaults_styles.screen, styles.screen]}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.inputContainer}>
            <View>
              {displayInput(0)}
              <IndicatorContainer>
                <Text>{resIndicator[0]}</Text>
              </IndicatorContainer>
            </View>
            <View>
              {displayInput(1)}
              <IndicatorContainer>
                <Text>{resIndicator[1]}</Text>
              </IndicatorContainer>
            </View>
            <View>
              {displayInput(2)}
              <IndicatorContainer>
                <Text>{resIndicator[2]}</Text>
              </IndicatorContainer>
            </View>
            <View>
              {displayInput(3)}
              <IndicatorContainer>
                <Text>{resIndicator[3]}</Text>
              </IndicatorContainer>
            </View>
          </View>
        </View>
        {/* view pour contenir liste essaies */}
        <View style={styles.listGuessesContainer}>
          <ScrollView contentContainerStyle={styles.listGuessesScroll}>
            {guesses.map((guesse, indice) => {
              let len = guesses.length;
              return renderGuesses(guesse, len - indice);
            })}
          </ScrollView>
        </View>
        {/* view pour contenir tous button */}
        <View style={{ alignItems: 'center' }}>
          <View style={styles.buttonContainer}>
            <MainButton onPress={checkUserNumber} style={styles.button}>
              <AntDesign name="check" size={32} />
            </MainButton>

            <MainButton onPress={resetHandler} style={styles.button}>
              <AntDesign name="reload1" size={32} />
            </MainButton>
          </View>

          <MainButton onPress={props.onGoBack} style={styles.button}>
            <AntDesign name="home" size={32} />
          </MainButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 5,
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
    height: 50,
  },
  listGuessesContainer: {
    flex: 1,
    width: '100%',
  },
  listGuessesScroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  guesse: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    height: 30,
  },
});

export default GameScreen;
