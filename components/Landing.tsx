import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppTitle from './AppTitle';
import LinkBtn from './LinkBtn';

const Landing = ({onPressGoogleButton, initialLoading}) => {
  return (
    <View style={styles.main}>
      <AppTitle />
      <View style={styles.centerContainer}>
        <Text style={styles.text}>let's make the shopping simple</Text>
      </View>
      {!initialLoading && (
        <>
          <Button title="CONTINUE WITH GOOGLE" onPress={onPressGoogleButton} />
        </>
      )}
      <View style={styles.innerView}>
        <View style={styles.ppAndTcLinks}>
          <Text style={styles.ppAndTcLinksText}>
            By clicking the button I will agree
          </Text>
          <LinkBtn
            textFontSize={15}
            text="terms & conditions"
            textColor="#00B2FF"
            onPress={() => Linking.openURL('https://shoponlive.in/termsAndConditions')}
          />
          <Text style={styles.ppAndTcLinksText}> and </Text>
          <LinkBtn
            textFontSize={15}
            text="privacy policy"
            textColor="#00B2FF"
            onPress={() => Linking.openURL('https://shoponlive.in/privacyPolicy')}
          />
        </View>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    marginTop: 10,
    marginBottom: 100,
  },
  text: {
    color: 'black',
  },
  
  innerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    // backgroundColor: 'black'
  },
  ppAndTcLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  ppAndTcLinksText: {
    color: '#000000',
  },
  links: {
    color: '#00B2FF',
  },
});
