import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppTitle from '../components/AppTitle';
import WhiteWrapper from '../components/WhiteWrapper';
import SellerAuth from '../components/SellerAuth';
import NormalAuth from '../components/NormalAuth';
import NormalGreenBtn from '../components/NormalGreenBtn';
import LinkBtn from '../components/LinkBtn';
import OtpVerification from '../components/OtpVerification';
import {checkAuthenticationAPI, sendSigninOtpOnWhatsappAPI, signinAPI} from '../actions/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  setIsLogedIn: (params: any) => any;
}

const AuthScreen = ({setIsLogedIn}: Props) => {
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

  const checkAuthentication = async () => {
    console.log("checking...")
    let auth_token = null;
    try {
      auth_token = await AsyncStorage.getItem('@token')
    } catch (e) {console.log(e)};
    console.log("auth: ", auth_token);
    if(!!auth_token){
      await checkAuthenticationAPI(auth_token).then(res=>{
        console.log(res.data);
        if(res.data.status === 'success'){
          setIsLogedIn(true);
        }
      }).catch(err=>showToaster(err.message));
    }
  }

  useEffect(()=>{
    checkAuthentication();
  },[]);

  const [isCreatingSellerAcc, setIsCreatingSellerAcc] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [authData, setAuthData] = useState({
    phone: '',
    zipcode: '',
    shopName: '',
    description: '',
    is_store_owner: true,
    otp: '',
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);
  }

  const SendOtp = async () => {
    if (!authData.phone || !authData.zipcode) {
      showToaster('All fields are required.');
      return;
    }
    if (isCreatingSellerAcc && (!authData.shopName || !authData.description)) {
      showToaster('All fields are required.');
      return;
    }
    setIsLoading(true);
    await sendSigninOtpOnWhatsappAPI({phone: authData.phone})
      .then(res => {
        if (res.data.status === 'success') {
          setIsOtpSent(true);
        } else showToaster(res.data.message);
      })
      .catch(err => showToaster(err.message));
      setIsLoading(false);
  };

  const onOtpVerification = async () => {
    let payloads = authData;
    payloads['is_store_owner'] = isCreatingSellerAcc;
    payloads['otp'] = otp;
    setIsLoading(true);
    await signinAPI(payloads)
      .then(async res => {
        if (res.data.status === 'success') {
          showToaster('You are ready to go!');
          try{
            await AsyncStorage.setItem('@token',res.data.token);
            setIsLogedIn(true);
          }catch(e){showToaster(e);}
        } else showToaster(res.data.message);
      })
      .catch(err => showToaster(err.message));
      setIsLoading(false);
  };

  if (isOtpSent) {
    return (
      <ScrollView style={styles.scrollview}>
        {isLoading && <View style={styles.loaderView}><ActivityIndicator size="large"/></View>}
        <View style={{...styles.main, minHeight: dimensions.height - 46}}>
          <View style={styles.innerView}>
            <AppTitle />
          </View>
          <View style={styles.innerView}>
            <WhiteWrapper>
              <OtpVerification
                otp={otp}
                setOtp={setOtp}
                onVerify={onOtpVerification}
              />
            </WhiteWrapper>
          </View>
          <View style={styles.innerView}>
            <View style={styles.lowerGap}></View>
            <LinkBtn
              textFontSize={14}
              text="GO BACK"
              textColor="#001AFF"
              onPress={() => setIsOtpSent(false)}
            />
            <View style={styles.lowerGap}></View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.scrollview}>
        {isLoading && <View style={styles.loaderView}><ActivityIndicator size="large"/></View>}
        <View style={{...styles.main, minHeight: dimensions.height - 46}}>
          <View style={styles.innerView}>
            <AppTitle />
          </View>
          <View style={styles.innerView}>
            <WhiteWrapper>
              {isCreatingSellerAcc ? (
                <SellerAuth data={authData} setData={setAuthData} />
              ) : (
                <NormalAuth data={authData} setData={setAuthData} />
              )}
            </WhiteWrapper>
          </View>
          <View style={styles.innerView}>
            <View style={styles.ppAndTcLinks}>
              <Text style={styles.ppAndTcLinksText}>
                By clicking below button I will agree
              </Text>
              <LinkBtn
                textFontSize={15}
                text="terms & conditions"
                textColor="#00B2FF"
                onPress={() => Linking.openURL('https://shoponlive.in')}
              />
              <Text style={styles.ppAndTcLinksText}> and </Text>
              <LinkBtn
                textFontSize={15}
                text="privacy policy"
                textColor="#00B2FF"
                onPress={() => Linking.openURL('https://shoponlive.in')}
              />
            </View>
            <NormalGreenBtn
              textFontSize={18}
              text="SEND OTP ON WHATSAPP"
              onPress={SendOtp}
            />
            <Text style={[styles.orTxt]}>OR</Text>
            {isCreatingSellerAcc ? (
              <LinkBtn
                textFontSize={14}
                text="GO BACK"
                textColor="#001AFF"
                onPress={() => setIsCreatingSellerAcc(false)}
              />
            ) : (
              <LinkBtn
                textFontSize={14}
                text="CREATE SELLER ACCOUNT"
                textColor="#001AFF"
                onPress={() => setIsCreatingSellerAcc(true)}
              />
            )}
            <View style={styles.lowerGap}></View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#EDF1F0',
    alignContent: 'center',
  },
  main: {
    backgroundColor: '#EDF1F0',
    minHeight: Dimensions.get('window').height - 26,
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  lowerGap: {
    width: '100%',
    height: 20,
  },
  orTxt: {
    color: 'black',
    marginVertical: 15,
    fontWeight: '900',
  },
  loaderView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(40,40,40,0.4)'
  }
});
