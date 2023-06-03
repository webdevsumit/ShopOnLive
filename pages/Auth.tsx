import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkAuthenticationAPI, loginToUserAccountAPI, resetPresetPasswordAPI, asswordAPI, signupByUserAPI, resetPasswordAPI} from '../actions/apis';
import Landing from '../components/Landing';
import AppTitle from '../components/AppTitle';
import NormalAuth from '../components/NormalAuth';
import SignupAuth from '../components/SignupAuth';
import ForgotPassword from '../components/ForgotPassword';

const Auth = ({setIsLogedIn, setHadZipCode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [extraMessage, setExtraMessage] = useState('');
  const [isLoginingIn, setIsLogingIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [loginAuthData, setLoginAuthData] = useState({
    username: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })
  const [forgotPassData, setForgotPassData] = useState({
    username: "",
    otp: "",
    password: "",
  })

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const checkAuthentication = async () => {
    setInitialLoading(true);
    let auth_token = null;
    try {
      auth_token = await AsyncStorage.getItem('@token')
    } catch (e) {console.log(e)};
    if(!!auth_token){
      await checkAuthenticationAPI(auth_token).then(async res=>{
        if(res.data.status === 'success'){
          if (!!res.data.zipcode) {
            try {
              await AsyncStorage.setItem('@zipcode', res.data.zipcode);
              setHadZipCode(true);
            } catch (e) {
              showToaster(JSON.stringify(e));
            }
          }
          setIsLogedIn(true);
        }
      }).catch(err=>showToaster(err.message));
    }
    setTimeout(()=>{
      setInitialLoading(false);
    },1000)
  }

  useEffect(() => {
    checkAuthentication();
  }, []);


  const onSignup = async () => {
    if(!signupData.username){
      showToaster("Username is required.");
      return;
    }
    if(!signupData.email){
      showToaster("Email is required.");
      return;
    }
    if(!signupData.phone){
      showToaster("Phone Number is required.");
      return;
    }
    if(!signupData.password){
      showToaster("Password is required.");
      return;
    }
    setIsLoading(true);
    await signupByUserAPI(signupData).then(async res=>{
      if(res.data.status === 'success'){
        try {
          await AsyncStorage.setItem('@token', res.data.token);
        } catch (e) {
          showToaster(JSON.stringify(e));
        }
        if (!!res.data.zipcode) {
          try {
            await AsyncStorage.setItem('@zipcode', res.data.zipcode);
            setHadZipCode(true);
          } catch (e) {
            showToaster(JSON.stringify(e));
          }
        }
        setIsLogedIn(true);
      } else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsLoading(false);
  }

  const onLogin = async () => {
    if(!loginAuthData.username){
      showToaster("Username is required.");
      return;
    }
    if(!loginAuthData.password){
      showToaster("Password is required.");
      return;
    }
    setIsLoading(true);
    await loginToUserAccountAPI(loginAuthData).then(async res=>{
      if(res.data.status === 'success'){
        try {
          await AsyncStorage.setItem('@token', res.data.token);
        } catch (e) {
          showToaster(JSON.stringify(e));
        }
        if (!!res.data.zipcode) {
          try {
            await AsyncStorage.setItem('@zipcode', res.data.zipcode);
            setHadZipCode(true);
          } catch (e) {
            showToaster(JSON.stringify(e));
          }
        }
        setIsLogedIn(true);
      } else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsLoading(false);
  }


  const onClickResetPass = async () => {
    if(!forgotPassData.username){
      showToaster("Username is required.");
      return;
    }
    if(!forgotPassData.otp){
      showToaster("OTP is required.");
      return;
    }
    if(!forgotPassData.password){
      showToaster("Password is required.");
      return;
    }
    setIsLoading(true);
    await resetPasswordAPI(forgotPassData).then(async res=>{
      if(res.data.status === 'success'){
        showToaster("Successfully Reset Password. Please LOGIN.")
        setShowForgotPass(false);
      } else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsLoading(false);
  }

  return (
    <View style={styles.main}>
      {initialLoading && (
        <View style={{...styles.loading, backgroundColor: 'white', zIndex: 5}}>
          <AppTitle />
        </View>
      )}
      {isLoginingIn && (
        <View style={{...styles.loading}}>
          <NormalAuth data={loginAuthData} setData={setLoginAuthData} onClickForgotPass={()=>{setIsLogingIn(false); setShowForgotPass(true)}} onBack={()=>setIsLogingIn(false)} onClickLogin={onLogin} />
        </View>
      )}
      {showForgotPass && (
        <View style={{...styles.loading}}>
          <ForgotPassword data={forgotPassData} setData={setForgotPassData} onBack={()=>setShowForgotPass(false)} onClickResetPass={onClickResetPass} setIsLoading={setIsLoading} />
        </View>
      )}
      {isSigningIn && (
        <View style={{...styles.loading}}>
          <SignupAuth data={signupData} setData={setSignupData} onBack={()=>setIsSigningIn(false)} onClickSignin={onSignup} />
        </View>
      )}
      {isLoading && (
        <View style={{...styles.loading, zIndex: 3}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Landing
        setIsLoading={setIsLoading}
        extraMessage={extraMessage}
        setIsLogingIn={setIsLogingIn}
        setIsSigningIn={setIsSigningIn}
      />
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
});
