import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getShopDetailsByIdAPI, googleEventCreaterAPI, scheduleNewMeetingAPI, updateGoogleEventAPI} from '../actions/apis';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import NormalGreenBtn from '../components/NormalGreenBtn';
import moment from 'moment';
import ReviewCard from '../components/ReviewCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopDetails = ({route}) => {
  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };
  const [shop, setShop] = useState(null);
  const [showDateBtnTitle, setShowDateBtnTitle] = useState(true);
  const [meetDateTime, setMeetDateTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isRefereshing, setIsRefereshing] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetails = async () => {
    setIsRefereshing(true);
    await getShopDetailsByIdAPI(route.params.shopId)
      .then(res => {
        if (res.data.status === 'success') {
          setShop(res.data.data);
          setUserEmail(res.data.userEmail);
        } else showToaster(res.data.message);
      })
      .catch(err => showToaster(err.message));
      setIsRefereshing(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const scheduelMeet = async () => {
    if(moment(meetDateTime) < moment()){
      showToaster("Please the select future date and time. We can't change the past.");
      return;
    }
    if(shop.user.email===userEmail){
      showToaster("You cannot schedule meeting to yourself.");
      return;
    }

    setIsLoading(true);
    const conferenceData = {
      // 'allowedConferenceSolutionTypes': ['hangoutsMeet'],
      'createRequest': {
        'requestId': `meet-${Math.random().toString(36).substring(7)}`,
        'conferenceSolutionKey': {
          'type': 'hangoutsMeet',
        },
      },
    };

    const event = {
      'summary': 'ShopOnLive Meeting',
      'description': "I want to buy something.",
      'start': {
        'dateTime': meetDateTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // current timeZone
      },
      'end': {
        'dateTime': moment(meetDateTime).add(40, 'minutes').toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // current timeZone
      },
      'conferenceDataVersion': 1,
      'conferenceData': conferenceData,
      'organizer': {
        'email': shop.store_name,
        'self': true,
      },
      "attendees": [
        {
          "email": userEmail,
          "displayName": "Client",
          "organizer": true,
          "self": true,
          "responseStatus": "accepted"
        },
        {
          'email': shop.user.email,
          "displayName": shop.store_name,
          "organizer": true,
          'self': true,
          "responseStatus": "accepted",
        },
      ],
    }

    let payload = {
      seller_id: route.params.shopId,
      meetTime: meetDateTime,
      // eventId: "eventData.id",
      // hangoutLink: eventData.hangoutLink,
    }
    await scheduleNewMeetingAPI(payload).then(res=>{
      if(res.data.status === "success"){
        setShowConfirmBox(true);
      }else{
        showToaster(res.data.message);
      }
    }).catch(err => console.log(err));

    setIsLoading(false);
  }

  if (!!shop)
    return (<>
      {showConfirmBox && 
        <View style={styles.confirmedBoxOuter}  >
          <View style={styles.confirmedBox}>
            <Text style={styles.confirmText}>Your shoping time is scheduled on </Text>
            <Text style={{...styles.confirmText, marginBottom: 5, color: 'red'}}>{moment(meetDateTime).format("DD/MM/yyyy")} at {moment(meetDateTime).format("hh:mm a")}.</Text>
            <Text style={{...styles.confirmText, marginBottom: 10}}>You can also check and join from meets tab or on Goolge Calendar.</Text>
            <NormalGreenBtn text="OKAY" onPress={()=>setShowConfirmBox(false)} />
          </View>
        </View>}
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefereshing} onRefresh={fetchDetails} />
        }
      >

        <View style={styles.main}>
          <View style={[styles.inline]}>
            <MaterialCommunityIcons name="star" color="#DB944B" size={20} />
            <Text style={[styles.text, styles.textTop]}>{shop.rating}</Text>
          </View>
          <Text style={[styles.text, styles.textHead]}>{shop.store_name}</Text>
          <View>
            <View style={styles.inlineButons}>
              <View>
                <NormalGreenBtn textFontSize={14} text={showDateBtnTitle ? "CHOOSE DATE & TIME" : moment(meetDateTime).format("DD/MM/YYYY hh:mm a ")} onPress={() => setOpenDatePicker(true)} bgColor="gray" />
              </View>
              <View>
                <NormalGreenBtn textFontSize={14} text="SCHEDULE" onPress={scheduelMeet} />
              </View>
            </View>
            <DatePicker
              modal
              open={openDatePicker}
              date={meetDateTime}
              title="SCHEDULE YOUR SHOPING TIME"
              onConfirm={date => {
                setOpenDatePicker(false);
                setMeetDateTime(date);
                setShowDateBtnTitle(false);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
          </View>
          <Text style={[styles.text, styles.textDesc]}>
            {shop.store_description}
          </Text>
        </View>
        <Text style={styles.reviewHeadTitle} >Last 20 Reviews & Ratings</Text>
        {shop.filtered_reviews.map(review=><ReviewCard key={review.id} review={review} />)}
      </ScrollView>
    </>
    );
  return <Text style={styles.loading}>loading...</Text>;
};

export default ShopDetails;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
  textHead: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textDesc: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  inlineButons: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginVertical: 5
  },
  reviewHeadTitle: {
    color: 'black',
    marginLeft: '5%',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  confirmedBoxOuter: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.2)',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: "center",
  },
  confirmedBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,

  },
  confirmText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    // margin: 5
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
