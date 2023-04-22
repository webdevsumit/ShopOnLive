import { StyleSheet, Text, ToastAndroid, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MeetCard from '../components/MeetCard'
import { getUpcomingMeetingsAPI } from '../actions/apis';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const MeetingScreen = ({navigation: { navigate }}) => {

  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [meetings, setMeetings] = useState<any>([]);
	const [totalMeetings, setTotalMeetings] = useState(0);
  const [page, setPage] = useState(1);
	const [caughtAll, setCaughtAll] = useState(false);
	const [pendingCall, setPendingCall] = useState(false);
  const [isRefereshing, setIsRefereshing] = useState(false)
  const [provider_token, set_provider_token] = useState(null)

  const fetchprovider_token = async () => { 
      await GoogleSignin.getTokens().then(({accessToken})=>{
        set_provider_token(accessToken);
      }).catch(err=>console.log("Shop Details, line 46: ", err))
    }

  const fetchUpcomingMeetings = async (pageNum) => {
    setPendingCall(true);
    await getUpcomingMeetingsAPI(pageNum).then(res=>{
      if(res.data.status === "success"){
        if(res.data.page===1){
          setMeetings(res.data.upcoming_meetings);
        }else{
          setMeetings(prevShops=>[...prevShops, ...res.data.upcoming_meetings]);
        }
        setCaughtAll(res.data.caughtAll);
        setTotalMeetings(res.data.upcoming_meetings_count)
        setPage(res.data.page);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setPendingCall(false);
    setIsRefereshing(false);
  }

  const resetParamOnReferesh = () => {
    setMeetings([]);
    setIsRefereshing(true); 
    fetchUpcomingMeetings(1);
  }

  useEffect(()=>{
    fetchUpcomingMeetings(page);
    fetchprovider_token();
  },[]);

  const onMeetJoin = (url) => {
    // navigate('InsideMeeting', {'MeetingId': id});
    Linking.openURL(url);
  }

  const onGivingRatingAndReview = (id) => {
    navigate('givingRatingAndReview', {'MeetId': id});
  }

  return (
    <FlatList
      data={meetings}
      renderItem={({item}:any)=><MeetCard key={item.id} meeting={item} onPressStartMeeting={onMeetJoin} onGivingRatingAndReview={onGivingRatingAndReview} provider_token={provider_token} />}
      keyExtractor={item => item.id}
      ListEmptyComponent={()=><Text style={styles.noResult}>{caughtAll ? "You do not have any meeting." : ""}</Text>}
      initialNumToRender={10}
      onEndReachedThreshold={1}
      onEndReached={(info) => {
        if(!caughtAll && !pendingCall){
          fetchUpcomingMeetings(page+1);
        }
      }}
      ListFooterComponent={()=><Text style={styles.noResult}>{!caughtAll ? "loading..." : ""}</Text>}
      refreshing={isRefereshing}
      onRefresh={resetParamOnReferesh}
    />
  )
}

export default MeetingScreen

const styles = StyleSheet.create({
  noResult: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  }
})