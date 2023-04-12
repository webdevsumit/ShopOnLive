/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import {SafeAreaView, StatusBar, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import AuthScreen from './pages/AuthScreen';
import TabStack from './navigation/TabStack';


function App(): JSX.Element {

	const [isLogedIn, setIsLogedIn] = useState(false);

  return (
      <SafeAreaView style={{backgroundColor: Colors.light}}>
			<StatusBar
        barStyle={'dark-content'}
        backgroundColor={isLogedIn? 'white' : '#EDF1F0'}
      />
			{isLogedIn?<TabStack />:<AuthScreen setIsLogedIn={setIsLogedIn}/>	}
      </SafeAreaView>
  );
}

export default App;
