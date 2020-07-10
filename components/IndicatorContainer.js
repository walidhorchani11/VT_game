import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

const IndicatorContainer = (props) => {
  return (
    <View style={[styles.indicatorContainer, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    borderWidth: 2,
    borderColor: colors.secondo,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndicatorContainer;
