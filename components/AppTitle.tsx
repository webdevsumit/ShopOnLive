import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const AppTitle = () => {
  return (
    <View style={styles.heroTitleView}>
      <Text style={styles.titleTextA}>Shop</Text>
      <Text style={styles.titleTextB}>On</Text>
      <Text style={styles.titleTextA}>Live</Text>
    </View>
  );
};

export default AppTitle;


const styles = StyleSheet.create({
    heroTitleView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    titleTextA: {
      color: 'black',
      fontSize: 28,
      fontWeight: '900'
    },
    titleTextB: {
      color: 'blue',
      fontSize: 28,
      fontWeight: '900'
    },
  });
