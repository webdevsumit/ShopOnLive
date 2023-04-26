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
import {checkAuthenticationAPI, setOrCheckUserAuthAPI} from '../actions/apis';
import Landing from '../components/Landing';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleAuth = ({setIsLogedIn, setHadZipCode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [extraMessage, setExtraMessage] = useState('');

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const configureGoogleSingin = async () => {
    GoogleSignin.configure({
      androidClientId:
        '983190905763-4j2fm6r4lrau3mtr9012sipttckloobt.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
  };

  const continueWithGoogle = async () => {
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              // console.log(userInfo);
              checkAuthenticationOnBE(userInfo.user);
            })
            .catch(e => {
              showToaster('ERROR: ' + JSON.stringify(e));
              setExtraMessage(JSON.stringify(e));
              setIsLoading(false);
            });
        }else showToaster('You do not have Play Service.');
      })
      .catch(e => {
        showToaster('ERROR: ' + JSON.stringify(e));
      });
  };

  const continueWithGoogleSilently = async () => {
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signInSilently()
            .then(userInfo => {
              checkAuthenticationOnBE(userInfo.user);
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  const initialGoogleCheck = async () => {
    setInitialLoading(true);
    await configureGoogleSingin();
    await continueWithGoogleSilently();
    setInitialLoading(false);
  };

  const checkAuthenticationOnBE = async ({
    id,
    email,
    givenName,
    familyName,
  }) => {
    setIsLoading(true);
    await setOrCheckUserAuthAPI({
      email: email,
      password: id,
      firstName: givenName,
      lastName: familyName,
    })
      .then(async res => {
        if (res.data.status === 'success') {
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
          setIsLoading(false);
        } else showToaster('ERROR! Call us or use another email. ');
      })
      .catch(err => showToaster(err.message));
  };

  useEffect(() => {
    initialGoogleCheck();
  }, []);

  return (
    <View style={styles.main}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Landing
        onPressGoogleButton={() => {
          continueWithGoogle();
          setIsLoading(true);
        }}
        initialLoading={initialLoading}
        extraMessage={extraMessage}
      />
    </View>
  );
};

export default GoogleAuth;

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
