import {Linking, Platform, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
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
  const [customerCareContact, setCustomerCareContact] = useState('7999004229');

  const fetchDetails = async () => {
    setIsRefereshing(true);
    await getAccountDetailsAPI().then(res=>{
      if(res.data.status === "success"){
        setDetails(res.data.data);
        setCustomerCareContact(res.data.customerCareContact);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsRefereshing(false);
  }

  useEffect(()=>{
    fetchDetails();
  },[]);

  const makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${customerCareContact}`;
    } else {
        phoneNumber = `telprompt:${customerCareContact}`;
    }
    Linking.openURL(phoneNumber);
};

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
            <MaterialCommunityIcons name="email-outline" color="green" size={18} />
            <Text style={[styles.text, styles.textTop]}>{details.user.email}</Text>
          </View>

          {details.is_store_owner ? <>
            <Text style={[styles.text, styles.shopName]}>{details.store_name}</Text>
            <Text style={[styles.text, styles.description]}>{details.store_description}</Text>
            <View style={styles.btnView}>
              <NormalGreenBtn text="EDIT" onPress={()=>navigation.navigate('AccountEdit')} />
            </View>
          </>:
          <>
            <Text style={styles.info}>You cannot change the EMAIL address.</Text>
            <Text style={styles.info}>To change the ZIPCODE click on the zipcode in the top bar.</Text>
          </>
          }
        </View>

        {details.is_store_owner?<>
          <Text style={[styles.text, styles.head]}>Billing</Text>
          <View style={styles.mainInner}>
            {/* <Text style={[styles.text, styles.shopName]}>Video Call Minutes: {(details.unpaidSeconds/60).toFixed(2)}</Text> */}
            {/* <Text style={[styles.text, styles.shopName]}>Amount To Pay: Rs. {(details.unpaidAmountInPaisa/60).toFixed(2)}</Text> */}
            <Text style={[styles.text, styles.shopName]}>CURRENT PLAN: FREE</Text>
            <Text style={[styles.text, styles.description]}>Subscribed on: {moment(details.lastPaidOn).format('DD/MM/YYYY')}</Text>
            <View style={styles.btnView}>
              <NormalGreenBtn text="UPGRADE NOW" onPress={()=>{
                // if(details.unpaidAmount>5){
                //   navigation.navigate('BalancePayment');
                // }
                // else showToaster("Unpaid amount should be more than 5.")
                showToaster("Currently, we are not offering any plan.")
              }} />
            </View>
          </View>
          <View style={styles.mainInner}>
            <Text style={{...styles.text, color: 'red'}}>
              {/* If the gap between last paid date and today is more than 30 days then your shop will temporarily be deactivated. */}
              Do not worry. Currently everything is free. We will not charge anything if our App will not help you to earn more (in anyway).
            </Text>
          </View>
        </>
        :
        <View style={styles.mainInner}>
          <Text style={{...styles.text, color: 'green'}}>
            Opening a shop or store in the market is very hard and take lots of money and time but opening an online shop is very easy just click on the below button.
          </Text>
          <Text style={{...styles.text, color: 'green', marginVertical: 5}}>
            You don't need to worry about shipping, soon we will start delievering your products.
          </Text>
          <Text style={{...styles.text, color: 'green'}}>
            Don't think twice. You can deactivate your shop whenever you want.
          </Text>
          <View style={styles.btnView}>
            {/* <NormalGreenBtn text="BECOME A SELLER" onPress={()=>navigation.navigate('AccountEdit')} /> */}
            <NormalGreenBtn text="BECOME A SELLER" onPress={()=>{Linking.openURL('https://shoponlive.in')}} />
          </View>
        </View>
        }
        <View style={{...styles.inline, width: '90%', justifyContent: 'space-between'}}>
            <View style={{...styles.btnView, flex: 1, marginHorizontal: 10}}>
              <NormalGreenBtn text="CALL US" onPress={makeCall} bgColor="blue" />
            </View>
            <View style={{...styles.btnView, flex: 1, marginHorizontal: 10}}>
              <NormalGreenBtn text="LOGOUT" onPress={logout} bgColor="red" />
            </View>
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
  },
  info: {
    color: 'gray',
    fontSize: 12
  }
});
