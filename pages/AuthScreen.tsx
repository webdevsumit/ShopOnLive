import {View, Text, StyleSheet, Linking, ScrollView, Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppTitle from '../components/AppTitle';
import WhiteWrapper from '../components/WhiteWrapper';
import SellerAuth from '../components/SellerAuth';
import NormalAuth from '../components/NormalAuth';
import NormalGreenBtn from '../components/NormalGreenBtn';
import LinkBtn from '../components/LinkBtn';
import OtpVerification from '../components/OtpVerification';

const AuthScreen = () => {

  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions(screen);
      },
    );
    return () => subscription?.remove();
  });
  
  const [isCreatingSellerAcc, setIsCreatingSellerAcc] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [sellerAuthData, setSellerAuthData] = useState({
    phone: '',
    zipcode: '',
    shopName: '',
    description: ''
  })
  const [normalAuthData, setNormalAuthData] = useState({
    phone: '',
    zipcode: ''
  })
  const [otp, setOtp] = useState('');

  const SendOtp = () => {
    if(isCreatingSellerAcc){
      console.log(sellerAuthData);
    }else{
      console.log(normalAuthData);
    }
  }

  const onOtpVerification = () => {
    console.log(otp);
  }

  if(isOtpSent) {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={{...styles.main, minHeight: dimensions.height-46}}>
          <View style={styles.innerView}>
            <AppTitle />
          </View>
          <View style={styles.innerView}>
            <WhiteWrapper>
              <OtpVerification otp={otp} setOtp={setOtp} onVerify={onOtpVerification} />
            </WhiteWrapper>
          </View>
          <View style={styles.innerView}>
            <View style={styles.lowerGap}></View>
            <LinkBtn textFontSize={14} text="GO BACK" textColor="#001AFF" onPress={()=>setIsOtpSent(false)} />
            <View style={styles.lowerGap}></View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scrollview}>
      <View style={{...styles.main, minHeight: dimensions.height-46}}>
        <View style={styles.innerView}>
          <AppTitle />
        </View>
        <View style={styles.innerView}>
          <WhiteWrapper>
            {isCreatingSellerAcc? 
              <SellerAuth data={sellerAuthData} setData={setSellerAuthData} />: 
              <NormalAuth data={normalAuthData} setData={setNormalAuthData} />}
          </WhiteWrapper>
        </View>
        <View style={styles.innerView}>
          <View style={styles.ppAndTcLinks}>
            <Text style={styles.ppAndTcLinksText}>By clicking below button I will agree</Text>
            <LinkBtn textFontSize={15} text="terms & conditions" textColor="#00B2FF" onPress={()=>Linking.openURL('https://shoponlive.in')} />
            <Text style={styles.ppAndTcLinksText}> and </Text>
            <LinkBtn textFontSize={15} text="privacy policy" textColor="#00B2FF" onPress={()=>Linking.openURL('https://shoponlive.in')} />
          </View>
          <NormalGreenBtn textFontSize={18} text="SEND OTP ON WHATSAPP" onPress={SendOtp} />
          <Text style={[styles.orTxt]}>OR</Text>
          {isCreatingSellerAcc?
            <LinkBtn textFontSize={14} text="GO BACK" textColor="#001AFF" onPress={()=>setIsCreatingSellerAcc(false)} />:
            <LinkBtn textFontSize={14} text="CREATE SELLER ACCOUNT" textColor="#001AFF" onPress={()=>setIsCreatingSellerAcc(true)} />
          }
          <View style={styles.lowerGap}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#EDF1F0',
    alignContent:'center',
  },
  main: {
    backgroundColor: '#EDF1F0',
    minHeight: Dimensions.get('window').height-26,
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignContent:'center',
    alignItems: 'center',
    flexDirection: 'column'
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
    marginTop: 15
  },
  ppAndTcLinksText: {
    color: '#000000'
  },
  links: {
    color: '#00B2FF'
  },
  lowerGap: {
    width: '100%',
    height: 20
  },
  orTxt: {
    color: 'black',
    marginVertical: 15,
    fontWeight: '900'
  }
});
