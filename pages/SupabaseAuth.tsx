import {ActivityIndicator, Button, Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAuthenticationAPI, setOrCheckUserAuthAPI } from '../actions/apis';
import NormalGreenBtn from '../components/NormalGreenBtn';
import WebView from 'react-native-webview';
import Landing from '../components/Landing';

const SupabaseAuth = ({ setIsLogedIn, setHadZipCode, supabaseClient, SUPABASE_URL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [browserWindow, setBrowserWindow] = useState(false);
	let googleAuthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${SUPABASE_URL}/auth/v1/callback?id=12341234`;
  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}

  const checkAuthentication = async (refreshToken) => {
    console.log("refreshToken: ", refreshToken);
    try {
			await AsyncStorage.setItem('@supabase_refresh_token', refreshToken);
		} catch (e) {
			console.log(e);
		}
    let auth_token = null;
    try {
      auth_token = await AsyncStorage.getItem('@token');
    } catch (e) {
      console.log(e);
    }
    console.log("auth_token: ", auth_token);
    if (!!auth_token) {
      await checkAuthenticationAPI(auth_token)
        .then(async res => {
          if (res.data.status === 'success') {
            if(!!res.data.zipcode){
                try {
                  await AsyncStorage.setItem('@zipcode', res.data.zipcode);
                  setHadZipCode(true);
                } catch (e) {
                  console.log(e);
                }
            }
            setIsLogedIn(true);
          }
        })
        .catch(err => showToaster(err.message));
      setIsLoading(false);
    }
  };

  const checkingSupabaseAuth = async () => {
    setIsLoading(true);
    let supabase_refresh_token = null;
    try {
      supabase_refresh_token = await AsyncStorage.getItem('@supabase_refresh_token');
    } catch (e) {
      console.log(e);
    }
    console.log("supabase_refresh_token: ", supabase_refresh_token);
    if (!!supabase_refresh_token) {
      await supabaseClient.auth.signIn({refreshToken: supabase_refresh_token}).then(res => {
        if(!res.error){
          checkAuthentication(res.session.refresh_token);
        }else console.log(res.error);
      });
    }
    setIsLoading(false);
  };

	const settingBaseAuth = async (refreshToken, supabaseUserId, userEmail) => {
		try {
			await AsyncStorage.setItem('@supabase_refresh_token', refreshToken);
		} catch (e) {
			console.log(e);
		}
		await setOrCheckUserAuthAPI({email: userEmail, password: supabaseUserId}).then(async res=>{
      if(res.data.status === "success"){
        setIsLoading(false);
        try {
          await AsyncStorage.setItem('@token', res.data.token);
        } catch (e) {
          console.log(e);
        }
        if(!!res.data.zipcode){
          try {
            await AsyncStorage.setItem('@zipcode', res.data.zipcode);
            setHadZipCode(true);
          } catch (e) {
            console.log(e);
          }
        }
        setIsLogedIn(true);
      } else showToaster("ERROR! Call us or use another email. ")
    }).catch(err=>showToaster(err.message));
	}

	const handleOpenUrl = (event) => {
		let urlString = event.url.replace('shoponlive://app#', 'shoponlive://app?');
    let url = new URL(urlString);
    let refreshToken = url.searchParams.get('refresh_token');
    if (!!refreshToken) {
      supabaseClient.auth.signIn({refreshToken}).then(res => {
        if(!res.error){
          settingBaseAuth(res.session.refresh_token, res.user.id, res.user.email);
        }
      });
    }else console.log(res.error);
	}

  useEffect(() => {
    Linking.addEventListener('url', handleOpenUrl);
    return (()=>{
      Linking.removeEventListener('url', handleOpenUrl);
    });
  }, []);

	useEffect(() => {
    checkingSupabaseAuth();
  }, []);

  return (
    <View style={styles.main}>
      {isLoading && <View style={styles.loading}><ActivityIndicator size="large"/></View>}
      <Landing onPressGoogleButton={()=>{Linking.openURL(googleAuthUrl); setIsLoading(true)}} />
    </View>
  );
};

export default SupabaseAuth;

const styles = StyleSheet.create({
	main: {
    width:'100%', 
    height: '100%',
    justifyContent: 'center', 
    alignContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width:'100%', 
    height: '100%',
    justifyContent: 'center', 
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2
  }
});
