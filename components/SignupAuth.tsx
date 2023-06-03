import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import NormalGreenBtn from './NormalGreenBtn';
import LinkBtn from './LinkBtn';

interface Props {
  data: any;
  setData: (params: any) => any;
}

const SignupAuth = ({data, setData, onBack, onClickSignin}: Props) => {
  
  const onUsernameChange = (val: any) => {
    let finalVal = val.toLowerCase().replace(/ /g,"");
    setData({...data, username: finalVal });
  }
  const onEmailChange = (val: any) => {
    setData({...data, email: val.toLowerCase().replace(/ /g,"")})
  }
  const onPhoneChange = (val: any) => {
    setData({...data, phone: val})
  }
  const onChangePassword = (val: any) => {
    setData({...data, password: val})
  }

  return (
    <View style={styles.main} >
        <View style={styles.container}>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={onUsernameChange}
              value={data.username}
              placeholder="Create username."
              autoComplete='username'
              cursorColor='#555'
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              maxLength={30}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
            />
          </View>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={onEmailChange}
              value={data.email}
              placeholder="example@gmail.com."
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              autoComplete='email'
              cursorColor='#555'
              // inputMode='email'
              maxLength={254}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
            />
          </View>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onPhoneChange}
              value={data.phone}
              placeholder="Enter 10 digit phone number."
              keyboardType="number-pad"
              autoComplete='tel-national'
              cursorColor='#555'
              inputMode='tel'
              maxLength={10}
              placeholderTextColor='#aaa'
            />
          </View>
          <View style={{...styles.wrapperView, marginBottom: 30}}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={data.password}
              placeholder="Create password."
              autoComplete='password'
              autoCapitalize='none'
              cursorColor='#555'
              secureTextEntry={true}
              maxLength={30}
              placeholderTextColor='#aaa'
            />
          </View>
          <NormalGreenBtn text="SIGNUP" onPress={onClickSignin} />
          <View style={{...styles.wrapperView, alignItems: 'center'}}>
            <LinkBtn text="back" textColor="gray" onPress={onBack} />
          </View>
        </View>
    </View>
  );
};

export default SignupAuth;

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
