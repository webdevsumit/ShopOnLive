import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTitle from '../components/AppTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MeetingScreen from '../pages/MeetingScreen';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const [zipcode, setZipcode] = React.useState("NO-ZIPCODE");
  const setZipcodeInZipcode = async () => {
    try {
      let tempZipcode = await AsyncStorage.getItem('@zipcode');
      if(!!tempZipcode) setZipcode(tempZipcode);
    } catch (e) {console.log(e)};
  }
  React.useEffect(()=>{
    setZipcodeInZipcode();
  },[])
  return (
    <View style={styles.superMain} >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            headerTitle: "",
            headerLeft: ()=><View style={styles.headerLeft}><AppTitle /></View>,
            headerRight: ()=><View style={styles.headerRight}>
                <MaterialCommunityIcons name="map-marker" color='black' size={24} />
                <Text style={styles.topBarZipcode}>{zipcode}</Text>
              </View>,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Shops') {
                iconName = 'store';
              } else if (route.name === 'Search') {
                iconName = 'magnify';
              } else if (route.name === 'Meetings') {
                iconName = 'video';
              } else if (route.name === 'Account') {
                iconName = 'account-circle';
              }
              return <MaterialCommunityIcons name={iconName} color={focused ? 'black' : 'gray'} size={size} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Shops"
            component={HomeStack}
            options={{title: 'Shops'}}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{title: 'Search'}}
          />
          <Tab.Screen
            name="Meetings"
            component={MeetingScreen}
            options={{title: 'Meets'}}
          />
          <Tab.Screen
            name="Account"
            component={AccountStack}
            options={{title: 'Account'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  headerLeft: {
    width: 170,
    // backgroundColor: 'red',
  },
  headerRight: {
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  topBarZipcode: {
    color: 'black'
  },
  superMain: {
    height: "100%"
  }
})