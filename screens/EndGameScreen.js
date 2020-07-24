import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import defaults_styles from '../constants/defaults_styles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const EndGameSceen = (props) => {
  const [showHistories, setShowHistories] = useState(false);
  console.log('histories on gameOver walidosss:::', props.histories);
  const displayHistories = () => {
    return (
      <ScrollView style={styles.x}>
        {props.histories.map((elem) => (
          <Text>{elem}</Text>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={defaults_styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.gif')}
          style={styles.image}
          fadeDuration={3000}
        />
      </View>
      <Text>number: {props.rdmNumber}</Text>
      <Text>nombre d'essaie: {props.countTry}</Text>

      <View>
        <MainButton onPress={() => setShowHistories(!showHistories)}>
          <AntDesign name={showHistories ? 'close' : 'menuunfold'} size={32} />
        </MainButton>
        <MainButton onPress={() => {}}>
          <AntDesign name="home" size={32} />
        </MainButton>
      </View>

      {showHistories && displayHistories()}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    height: 270,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondo,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  x: {
    flex: 1,
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});

export default EndGameSceen;
