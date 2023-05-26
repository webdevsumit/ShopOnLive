/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import { Linking, SafeAreaView, StatusBar, Text } from 'react-native';

import TabStack from './navigation/TabStack';

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NormalGreenBtn from './components/NormalGreenBtn';
import Auth from './pages/Auth';


function App(): JSX.Element {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [hadZipCode, setHadZipCode] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
        {!isLogedIn ? (
          <>
            <Auth setIsLogedIn={setIsLogedIn} setHadZipCode={setHadZipCode} />
          </>
        ) : (
          <>
            <TabStack hadZipCode={hadZipCode}/>
          </>
        )}
    </SafeAreaView>
  );
}

export default App;
