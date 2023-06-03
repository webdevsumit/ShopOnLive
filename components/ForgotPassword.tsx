import {StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import NormalGreenBtn from './NormalGreenBtn';
import LinkBtn from './LinkBtn';
import { sendOtpToResetPasswordAPI } from '../actions/apis';

const ForgotPassword = ({data, setData, onBack, onClickResetPass, setIsLoading }) => {

  const [sentOtp, setSentOtp] = useState(false);
  
  const onUsernameChange = (val: any) => {
    setData({...data, username: val.replace(/ /g,"_")})
  }
  const onChangeOtp = (val: any) => {
    setData({...data, otp: val})
  }

  const onChangePassword = (val: any) => {
    setData({...data, password: val})
  }

  const onSendOtp = async () => {
    if(!data.username){
      showToaster("Username is required!");
      return;
    }

    setIsLoading(true);
    await sendOtpToResetPasswordAPI({username: data.username}).then(async res=>{
      if(res.data.status === 'success'){
        showToaster("OTP sent to your EMAIL.")
        setSentOtp(true);
      } else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsLoading(false);
  }

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  return (
    <View style={styles.main} >
        <View style={styles.container}>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Username</Text>
            {sentOtp? 
            <TouchableOpacity onPress={()=>{setData({username: data.username, otp: "", password: ""}); setSentOtp(false)}}>
              <Text style={{...styles.text, textDecorationLine: 'underline', color: 'green'}}>{data.username}</Text>
            </TouchableOpacity>
            :<TextInput
              style={styles.input}
              onChangeText={onUsernameChange}
              value={data.username}
              placeholder="Enter username."
              autoComplete='username'
              cursorColor='#555'
              maxLength={30}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
            />}
          </View>
          {sentOtp && <>
            <View style={{...styles.wrapperView, marginBottom: 30}}>
              <Text style={styles.text}>OTP</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeOtp}
                value={data.otp}
                placeholder="Enter 6 digit OTP."
                autoComplete='sms-otp'
                keyboardType="number-pad"
                inputMode='numeric'
                cursorColor='#555'
                maxLength={6}
                placeholderTextColor='#aaa'
              />
            </View>
            <View style={{...styles.wrapperView, marginBottom: 30}}>
              <Text style={styles.text}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={data.password}
                placeholder="Create new password."
                autoComplete='password'
                autoCapitalize='none'
                cursorColor='#555'
                secureTextEntry={true}
                maxLength={30}
                placeholderTextColor='#aaa'
              />
            </View>
          </>}
          {sentOtp ? <>
            <NormalGreenBtn text="RESET PASSWORD" onPress={onClickResetPass} />
          </>:<>
            <NormalGreenBtn text="SEND OTP" onPress={onSendOtp} />
          </>}
          <View style={{...styles.wrapperView, alignItems: 'center'}}>
            <LinkBtn text="back" textColor="gray" onPress={onBack} />
          </View>
        </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    minWidth: 300,
    maxWidth: '90%',
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10
  },
  wrapperView: {
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 0,
    color: 'black',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white'
  },
});
