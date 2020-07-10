import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
    backgroundColor: '#DAA520',
    width: '100%',
    height: 40,
  },
  //#808000
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;
