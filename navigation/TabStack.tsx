import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTitle from '../components/AppTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';
import MeetsStack from './MeetsStack';
import NormalGreenBtn from '../components/NormalGreenBtn';
import { changeZipcodeAPI } from '../actions/apis';
import RNRestart from 'react-native-restart'; 
import InsideMeetingScreen from '../pages/InsideMeetingScreen';

const Tab = createBottomTabNavigator();

const TabStack = ({hadZipCode, SUPABASE_URL}) => {
  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}

  const [zipcode, setZipcode] = React.useState("");
  const [zipBox, setZipBox] = React.useState(!hadZipCode);
  const [isSaving, setIsSaving] = React.useState(false);

  const setZipcodeInZipcode = async () => {
    try {
      let tempZipcode = await AsyncStorage.getItem('@zipcode');
      if(!!tempZipcode){
        setZipcode(tempZipcode);
      }
      else{
        zipBox(true);
      }
    } catch (e) {console.log(e)};
  }
  React.useEffect(()=>{
    setZipcodeInZipcode();
  },[]);

  const onChangeZIp = async () => {
    if(isSaving){
      showToaster("Please Wait.");
      return;
    }
    setIsSaving(true);
    await changeZipcodeAPI(zipcode).then(async res=>{
      if(res.data.status === "success"){
        try {
          await AsyncStorage.setItem('@zipcode', zipcode);
          showToaster("Changed Successfully.");
          RNRestart.restart();
        } catch (e) {console.log(e)};
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsSaving(false);
  }

  return (
    <View style={styles.superMain} >
      {zipBox && <View style={styles.zipBox}>
        <View style={styles.zipBoxInner}>
        <View style={styles.wrapperView}>
            <TextInput
              style={styles.input}
              onChangeText={txt=>setZipcode(txt)}
              value={zipcode}
              placeholder="Enter zipcode/pincode."
              keyboardType="number-pad"
              autoComplete='postal-code'
              cursorColor='#555'
              inputMode='numeric'
              maxLength={6}
              placeholderTextColor='#aaa'
              textAlignVertical="center"
              textAlign="center"
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
              <NormalGreenBtn text={isSaving ? "SAVING..." : "SAVE"} onPress={onChangeZIp} />
              {hadZipCode && <>
                <View style={{width: 3}}></View>
                <NormalGreenBtn text={"CANCEL"} onPress={()=>setZipBox(false)} bgColor="#777" />
              </>}
            </View>
          </View>
        </View>
      </View>}
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={hadZipCode ? "Shops" : "Account"}
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            headerTitle: "",
            headerLeft: ()=><View style={styles.headerLeft}><AppTitle /></View>,
            headerRight: ()=><TouchableOpacity onPress={()=>setZipBox(true)}>
                              <View style={styles.headerRight}>
                              <MaterialCommunityIcons name="map-marker" color='black' size={24} />
                              <Text style={styles.topBarZipcode}>{zipcode}</Text>
                            </View>
                          </TouchableOpacity>,
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
              } else if (route.name === 'InsideMeeting') {
                iconName = 'none';
                return <></>;
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
            component={MeetsStack}
            // options={{title: 'Meets', tabBarStyle:{display:'none'}, headerShown: false}}
          />
          <Tab.Screen
            name="Account"
            component={AccountStack}
            options={{title: 'Account'}}
          />
          <Tab.Screen
            name="InsideMeeting"
            component={InsideMeetingScreen}
            options={{title: '', tabBarStyle:{display:'none'}, headerShown: false, tabBarButton: ()=><></>, unmountOnBlur: true}}
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
  },
  zipBox: {
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zipBoxInner: {
    minHeight: 40,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  input: {
    height: 40,
    // width: "100%",
    borderWidth: 1,
    padding: 10,
    color: 'black',
    borderColor: 'black',
    marginBottom: 20,
  },
})