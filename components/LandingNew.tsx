import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppTitle from './AppTitle';
import LinkBtn from './LinkBtn';
import NormalGreenBtn from './NormalGreenBtn';

const LandingNew = ({setIsLoading, extraMessage, setIsLogingIn, setIsSigningIn}) => {
  return (
      <View style={styles.main}>
        <AppTitle />
        <View style={styles.centerContainer}>
            <Text style={styles.text}>ALL YOUR NEARBY SHOPS ARE HERE</Text>
        </View>
        <View style={{...styles.outerMain, marginVertical: 30}} >
          <Text style={{...styles.text,  textAlign: 'center'}}>Search for an item, Select an area, Choose a Shop, Schedule time, that's it. Now, you are connected to the shop.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <NormalGreenBtn text="LOGIN" onPress={()=>{setIsLogingIn(true)}} />
          <View style={{padding: 8}}></View>
          <NormalGreenBtn text="SIGNUP" onPress={()=>{setIsSigningIn(true)}} />
          <View style={{padding: 8}}></View>
          <NormalGreenBtn text="KNOW MORE ABOUT US" onPress={() => Linking.openURL('https:shoponlive.in')} />
          <View style={{padding: 8}}></View>
          <NormalGreenBtn text="MESSAGE US ON WHATSAPP" onPress={() => Linking.openURL('https://wa.me/917999004229')} />
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

export default LandingNew;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: "#EDF1F0",
    paddingTop: "25%",
  },
  outerMain: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    // backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  centerContainer: {
    marginTop: 5,
    marginBottom: 40,
  },
  text: {
    color: 'black',
  },
  buttonsContainer: {
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: '12%'
  },
  innerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginTop: '12%',
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
