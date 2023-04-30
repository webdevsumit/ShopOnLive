import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppTitle from './AppTitle';
import LinkBtn from './LinkBtn';

const Landing = ({onPressGoogleButton, initialLoading, extraMessage}) => {
  return (
    <ScrollView style={{width: '100%'}}>
      <View style={styles.main}>
        <View style={{...styles.outerMain, marginTop: 30}} >
          <AppTitle />
          <View style={styles.centerContainer}>
            <Text style={styles.text}>let's make the shopping simple</Text>
          </View>
          <Text style={{...styles.text, marginBottom: 10, textAlign: 'center'}}>Our goal is to increase the sales of shops and stores and that can happen if we make their customer’s life easier.</Text>
          <Text style={{...styles.text, marginBottom: 10, textAlign: 'center'}}>To achieve our goal we provide this platform to schedule meetings with shops and stores. It is really similar to really shopping.</Text>
          <Text style={{...styles.text, marginBottom: 10, textAlign: 'center'}}>People buy their items on a video call and we deliver them to their home steps.</Text>
          <Text style={{...styles.text, fontWeight: 'bold',  textAlign: 'center'}}>Now, you don’t need a physical store to start your business in your area.</Text>
        </View>
        <View style={{...styles.outerMain, marginBottom: 40}} >
          <Text style={{...styles.text, marginBottom: 20, fontWeight: 'bold',  textAlign: 'center'}}>Registration Information</Text>
          <Text style={{...styles.text, marginBottom: 10,  textAlign: 'center'}}>We are using Google authentication to login button i.e. “CONTINUE WITH GOOGLE”</Text>
          <Text style={{...styles.text, marginBottom: 10,  textAlign: 'center'}}>Click the button and select the Email account to continue. It will ask for Google Calendar permission.</Text>
          <Text style={{...styles.text, marginBottom: 10,  textAlign: 'center'}}>Check the Google Calendar box. We use that to schedule the meeting on your calendar and to create a Google Meet link. We are using Google Meet for meetings.</Text>
          <Text style={{...styles.text, marginBottom: 10,  textAlign: 'center'}}>Then put the zip code and done. that’s it. But if you are a shop owner or want to start a business then please also put your store information.</Text>
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
        <View style={{...styles.innerView, paddingVertical: '10%' }}>
          {!!extraMessage && <Text style={{color: 'red', marginHorizontal: '10%'}}>{extraMessage}</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EDF1F0"
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
