import {RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteWrapper from '../components/WhiteWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NormalGreenBtn from '../components/NormalGreenBtn';
import { getAccountDetailsAPI } from '../actions/apis';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'; 

const AccountScreen = ({ navigation }) => {
  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [details, setDetails] = useState(null);
  const [isRefereshing, setIsRefereshing] = useState(false);

  const fetchDetails = async () => {
    setIsRefereshing(true);
    await getAccountDetailsAPI().then(res=>{
      if(res.data.status === "success"){
        setDetails(res.data.data);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsRefereshing(false);
  }

  useEffect(()=>{
    fetchDetails();
  },[]);

  const logout = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log(e);
    }
    RNRestart.restart();
  }

  if (!details) return <Text style={styles.loading}>loading...</Text>
  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={isRefereshing} onRefresh={fetchDetails} />
    }
    >
      <View style={styles.main}>
        <View style={styles.mainInner}>
          <View style={[styles.inline]}>
            <MaterialCommunityIcons name="whatsapp" color="green" size={18} />
            <Text style={[styles.text, styles.textTop]}>{details.country_code} {details.phone}</Text>
          </View>
          <Text style={[styles.text, styles.shopName]}>{details.store_name}</Text>
          <Text style={[styles.text, styles.description]}>{details.store_description}</Text>
          <View style={styles.btnView}>
            <NormalGreenBtn text="EDIT" onPress={()=>navigation.navigate('AccountEdit')} />
          </View>
        </View>
        <Text style={[styles.text, styles.head]}>Billing</Text>
        <View style={styles.mainInner}>
          <Text style={[styles.text, styles.shopName]}>Video Call Minutes: {details.unpaidMinutes}</Text>
          <Text style={[styles.text, styles.shopName]}>Amount To Pay: Rs. {details.unpaidAmount}</Text>
          <Text style={[styles.text, styles.description]}>Last paid on: {moment(details.lastPaidOn).format('DD/MM/YYYY')}</Text>
          <View style={styles.btnView}>
            <NormalGreenBtn text="PAY NOW" onPress={()=>{
              if(details.unpaidAmount>5){
                navigation.navigate('BalancePayment');
              }else showToaster("Unpaid amount should be more than 5.")
            }} />
          </View>
        </View>
        <View style={styles.mainInner}>
          <Text style={{...styles.text, color: 'red'}}>
            If the gap between last paid date and today is more than 30 days then your shop will temporarily be deactivated.
          </Text>
        </View>
        <View style={styles.btnView}>
            <NormalGreenBtn text="LOGOUT" onPress={logout} bgColor="red" />
          </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  mainInner: {
    width: "90%",
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10
  },
  inline: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
  textTop: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  shopName: {
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
    fontSize: 18
  },
  description: {
    marginLeft: 5,
    marginTop: 5,
  },
  head: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 18
  },
  btnView: {
    marginVertical: 10
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  }
});
