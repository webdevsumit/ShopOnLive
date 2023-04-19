/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import { Linking, SafeAreaView, StatusBar, Text } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import AuthScreen from './pages/AuthScreen';
import TabStack from './navigation/TabStack';

import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NormalGreenBtn from './components/NormalGreenBtn';
import SupabaseAuth from './pages/SupabaseAuth';

const SUPABASE_URL = `https://gzjdnafowxliuydsozuv.supabase.co`;
const anonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6amRuYWZvd3hsaXV5ZHNvenV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4MDY1NDUsImV4cCI6MTk5NzM4MjU0NX0.ITPxtgdPY5n-DKDm-jxbQLrqgMRJeZ1SsFVe-wr5ujk`;

const supabaseClient = createClient(SUPABASE_URL, anonKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
});


function App(): JSX.Element {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [hadZipCode, setHadZipCode] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: Colors.light}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isLogedIn ? 'black' : '#EDF1F0'}
      />
        {!isLogedIn ? (
          <>
            {/* <AuthScreen setIsLogedIn={setIsLogedIn}/>	 */}
            <SupabaseAuth setIsLogedIn={setIsLogedIn} setHadZipCode={setHadZipCode} supabaseClient={supabaseClient} SUPABASE_URL={SUPABASE_URL} />
          </>
        ) : (
          <>
            <TabStack hadZipCode={hadZipCode} SUPABASE_URL={SUPABASE_URL} />
          </>
        )}
    </SafeAreaView>
  );
}

export default App;
