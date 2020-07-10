import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../constants/colors';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Vache VS toureau</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primo,
    width: '100%',
    height: 40,
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;
