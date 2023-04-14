import {ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteWrapper from '../components/WhiteWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NormalGreenBtn from '../components/NormalGreenBtn';
import { getAccountDetailsAPI, updateAccountDetailsAPI } from '../actions/apis';
import moment from 'moment';

const AccountEdit = ({ navigation }) => {
  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [details, setDetails] = useState(null);
  const [isRefereshing, setIsRefereshing] = useState(false);

  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchDetails = async () => {
    setIsRefereshing(true);
    await getAccountDetailsAPI().then(res=>{
      if(res.data.status === "success"){
        setDetails(res.data.data);
        if(res.data.data.is_store_owner){
            setShopName(res.data.data.store_name);
            setShopDescription(res.data.data.store_description);
        }
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsRefereshing(false);
  }

  useEffect(()=>{
    fetchDetails();
  },[]);

  const updateDetails = async () => {
    if(isSaving) return;
    setIsSaving(true);
    await updateAccountDetailsAPI({shopName, shopDescription}).then(res=>{
        if(res.data.status === "success"){
            showToaster("Saved");
            navigation.push("AccountMain");
        }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsSaving(false);
  }

  if (!details) return <Text style={styles.loading}>loading...</Text>
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.mainInner}>
          <View style={[styles.inline]}>
            <MaterialCommunityIcons name="whatsapp" color="green" size={18} />
            <Text style={[styles.text, styles.textTop]}>{details.country_code} {details.phone}</Text>
          </View>
          <Text style={styles.info}>You cannot change the PHONE number.</Text>
          <Text style={styles.info}>To change the ZIPCODE click on the zipcode in the top bar.</Text>

          <TextInput
              style={styles.input}
              onChangeText={txt=>setShopName(txt)}
              value={shopName}
              placeholder="Enter Shop Name."
              keyboardType="default"
              cursorColor='#555'
              maxLength={100}
              placeholderTextColor='#aaa'
            />

          <TextInput
              style={[styles.input, styles.largeInputBox ]}
              multiline
              numberOfLines={100}
              onChangeText={txt=>setShopDescription(txt)}
              value={shopDescription}
              placeholder="Type here. Try to include all the items that you sell and places where you search to come in the searches."
              keyboardType="default"
              cursorColor='#555'
              maxLength={1500}
              placeholderTextColor='#aaa'
            />

          <View style={styles.btnView}>
            <NormalGreenBtn text={isSaving ? "SAVING..." : "SAVE" }onPress={updateDetails} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountEdit;

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
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 5,
    color: 'black',
    borderColor: 'black',
    marginTop: 10
  },
  largeInputBox: {
    height: 500,
    borderColor: 'black', 
    padding: 5, 
    marginTop: 10,
    borderTopColor: 'black',
    textAlign: 'left',
    verticalAlign: 'top',
  }
});
