import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppTitle from './AppTitle';
import LinkBtn from './LinkBtn';
import NormalGreenBtn from './NormalGreenBtn';

const Landing = ({setIsLoading, extraMessage, setIsLogingIn, setIsSigningIn}) => {
  return (
      <View style={styles.main}>
        <View style={{...styles.outerMain, marginTop: 30}} >
          <AppTitle />
          <View style={styles.centerContainer}>
            <Text style={styles.text}>Shop, Shopping and Home</Text>
          </View>
          <Text style={{...styles.text, marginBottom: 10, textAlign: 'center'}}>The reason can be anything, hot summer, heavy rainfall or your mood to go outside. Nothing can stop to shop.</Text>
          <Text style={{...styles.text, marginBottom: 10, textAlign: 'center'}}>Select suits or sarees along with your whole big family.</Text>
          <Text style={{...styles.text, fontWeight: 'bold',  textAlign: 'center'}}>Select an area, Choose a Shop, Schedule time, that's it. Now, you are connected to the shop.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <NormalGreenBtn text="LOGIN" onPress={()=>{setIsLogingIn(true)}} />
          <NormalGreenBtn text="SIGNUP" onPress={()=>{setIsSigningIn(true)}} />
        </View>
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
        <View style={{...styles.innerView, paddingVertical: '10%' }}>
          {!!extraMessage && <Text style={{color: 'red', marginHorizontal: '10%'}}>{extraMessage}</Text>}
        </View>
      </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#EDF1F0",
    paddingTop: "30%",
  },
  outerMain: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  centerContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  text: {
    color: 'black',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 10,
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
