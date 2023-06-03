import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import NormalGreenBtn from './NormalGreenBtn';
import LinkBtn from './LinkBtn';

const NormalAuth = ({data, setData, onBack, onClickForgotPass, onClickLogin }) => {
  
  const onUsernameChange = (val: any) => {
    setData({...data, username: val.replace(/ /g,"_")})
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
              placeholder="Enter username."
              autoComplete='username'
              cursorColor='#555'
              maxLength={30}
              placeholderTextColor='#aaa'
              autoCapitalize='none'
            />
          </View>
          <View style={{...styles.wrapperView, marginBottom: 30}}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={data.password}
              placeholder="Enter password."
              autoComplete='password'
              autoCapitalize='none'
              cursorColor='#555'
              secureTextEntry={true}
              maxLength={30}
              placeholderTextColor='#aaa'
            />
          </View>
          <NormalGreenBtn text="LOGIN" onPress={onClickLogin} />
          <View style={{...styles.wrapperView, alignItems: 'center'}}>
            <View style={{marginVertical: 2}}></View>
            <LinkBtn text="Forgot Password" textColor="gray" onPress={onClickForgotPass} />
            <View style={{marginVertical: 4}}></View>
            <LinkBtn text="back" textColor="gray" onPress={onBack} />
          </View>
        </View>
    </View>
  );
};

export default NormalAuth;

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
